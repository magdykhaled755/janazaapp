// خدمات نظام الإشعارات
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp
} from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// تكوين كيفية ظهور الإشعارات عندما يكون التطبيق في المقدمة
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// تسجيل الجهاز للإشعارات
export const registerForPushNotifications = async (userId) => {
  try {
    let token;
    
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        return {
          success: false,
          error: 'فشل في الحصول على إذن الإشعارات'
        };
      }
      
      token = (await Notifications.getExpoPushTokenAsync()).data;
      
      // تحديث رمز الإشعارات في وثيقة المستخدم
      await updateUserFCMToken(userId, token);
      
      // تكوين قناة الإشعارات لنظام Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'إشعارات الوفيات',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FFEB3B',
        });
      }
      
      return {
        success: true,
        token
      };
    } else {
      return {
        success: false,
        error: 'يجب استخدام جهاز فعلي للإشعارات'
      };
    }
  } catch (error) {
    console.error('خطأ في تسجيل الإشعارات:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تحديث رمز إشعارات المستخدم
const updateUserFCMToken = async (userId, token) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcm_token: token
    });
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث رمز الإشعارات:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// إرسال إشعار محلي (للاختبار)
export const sendLocalNotification = async (title, body, data = {}) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // إرسال فوري
    });
    
    return { success: true };
  } catch (error) {
    console.error('خطأ في إرسال الإشعار المحلي:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// إرسال إشعار لجميع المستخدمين عند إنشاء إعلان جديد
export const sendAnnouncementNotification = async (announcement) => {
  try {
    // جلب رموز إشعارات جميع المستخدمين
    const usersQuery = query(collection(db, 'users'), where('fcm_token', '!=', null));
    const usersSnapshot = await getDocs(usersQuery);
    
    const tokens = [];
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.fcm_token) {
        tokens.push(userData.fcm_token);
      }
    });
    
    if (tokens.length === 0) {
      return {
        success: true,
        message: 'لا يوجد مستخدمين مسجلين للإشعارات'
      };
    }
    
    // إنشاء محتوى الإشعار
    const title = 'إعلان وفاة جديد';
    const body = `${announcement.deceased_name} - ${announcement.funeral_location}`;
    
    // إرسال الإشعار لجميع المستخدمين
    await sendPushNotifications(tokens, title, body, { announcementId: announcement.id });
    
    // تسجيل الإشعار في قاعدة البيانات
    await addDoc(collection(db, 'notifications'), {
      title,
      body,
      announcement_id: announcement.id,
      sent_at: serverTimestamp(),
      recipients_count: tokens.length
    });
    
    return {
      success: true,
      recipients_count: tokens.length
    };
  } catch (error) {
    console.error('خطأ في إرسال إشعار الإعلان:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// إرسال إشعارات لقائمة من الأجهزة
const sendPushNotifications = async (expoPushTokens, title, body, data = {}) => {
  const messages = expoPushTokens.map(token => ({
    to: token,
    sound: 'default',
    title,
    body,
    data,
  }));

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });
};
