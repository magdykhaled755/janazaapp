// خدمات إدارة إعلانات الوفاة
import { db, storage } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  orderBy, 
  limit,
  updateDoc,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// إنشاء إعلان وفاة جديد
export const createAnnouncement = async (userId, announcementData) => {
  try {
    // إنشاء وثيقة الإعلان في Firestore
    const docRef = await addDoc(collection(db, 'announcements'), {
      user_id: userId,
      deceased_name: announcementData.deceased_name,
      funeral_location: announcementData.funeral_location,
      funeral_time: announcementData.funeral_time,
      condolences_location: announcementData.condolences_location || null,
      condolences_time: announcementData.condolences_time || null,
      additional_details: announcementData.additional_details || null,
      created_at: serverTimestamp(),
      payment_status: 'pending', // حالة الدفع الأولية: معلق
      is_active: false // الإعلان غير نشط حتى يتم الدفع
    });
    
    return {
      success: true,
      announcement_id: docRef.id
    };
  } catch (error) {
    console.error('خطأ في إنشاء الإعلان:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// الحصول على قائمة آخر الإعلانات النشطة
export const getActiveAnnouncements = async (limitCount = 20) => {
  try {
    const q = query(
      collection(db, 'announcements'),
      where('is_active', '==', true),
      orderBy('created_at', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const announcements = [];
    
    querySnapshot.forEach((doc) => {
      announcements.push({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate().toISOString() || new Date().toISOString()
      });
    });
    
    return {
      success: true,
      announcements
    };
  } catch (error) {
    console.error('خطأ في جلب الإعلانات:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// الحصول على تفاصيل إعلان محدد
export const getAnnouncementDetails = async (announcementId) => {
  try {
    const docRef = doc(db, 'announcements', announcementId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        announcement: {
          id: docSnap.id,
          ...docSnap.data(),
          created_at: docSnap.data().created_at?.toDate().toISOString() || new Date().toISOString()
        }
      };
    } else {
      throw new Error('الإعلان غير موجود');
    }
  } catch (error) {
    console.error('خطأ في جلب تفاصيل الإعلان:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تحديث حالة الدفع وتنشيط الإعلان
export const updateAnnouncementPaymentStatus = async (announcementId, paymentStatus, isActive = false) => {
  try {
    const docRef = doc(db, 'announcements', announcementId);
    await updateDoc(docRef, {
      payment_status: paymentStatus,
      is_active: isActive
    });
    
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث حالة الدفع:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// الحصول على إعلانات مستخدم محدد
export const getUserAnnouncements = async (userId) => {
  try {
    const q = query(
      collection(db, 'announcements'),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const announcements = [];
    
    querySnapshot.forEach((doc) => {
      announcements.push({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate().toISOString() || new Date().toISOString()
      });
    });
    
    return {
      success: true,
      announcements
    };
  } catch (error) {
    console.error('خطأ في جلب إعلانات المستخدم:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
