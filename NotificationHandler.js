import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useAppContext } from '../context/AppContext';
import { registerForPushNotifications } from '../services/NotificationService';
import { COLORS, FONT_SIZES, SPACING } from '../utils/theme';

const NotificationHandler = () => {
  const { state } = useAppContext();
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // تسجيل الجهاز للإشعارات عند تسجيل الدخول
    const setupNotifications = async () => {
      if (state.user && state.isAuthenticated) {
        try {
          const result = await registerForPushNotifications(state.user.id);
          if (!result.success) {
            console.log('فشل في تسجيل الإشعارات:', result.error);
          }
        } catch (error) {
          console.error('خطأ في إعداد الإشعارات:', error);
        }
      }
    };

    setupNotifications();

    // الاستماع للإشعارات الواردة عندما يكون التطبيق في المقدمة
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // الاستماع للتفاعل مع الإشعارات
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      
      // التعامل مع النقر على الإشعار (مثلاً: الانتقال إلى صفحة تفاصيل الإعلان)
      if (data.announcementId) {
        // يمكن استخدام navigation.navigate هنا إذا كان متاحًا
        console.log('الانتقال إلى تفاصيل الإعلان:', data.announcementId);
      }
    });

    // تنظيف المستمعين عند إلغاء تحميل المكون
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [state.user, state.isAuthenticated]);

  // عرض الإشعار الحالي (اختياري، يمكن إزالته في الإنتاج)
  if (notification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{notification.request.content.title}</Text>
        <Text style={styles.body}>{notification.request.content.body}</Text>
      </View>
    );
  }

  // هذا المكون لا يعرض أي شيء في واجهة المستخدم عادةً
  return null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    zIndex: 999,
  },
  title: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  body: {
    fontSize: FONT_SIZES.small,
    color: COLORS.white,
  },
});

export default NotificationHandler;
