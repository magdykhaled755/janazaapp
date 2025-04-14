// خدمات نظام الدفع
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { updateAnnouncementPaymentStatus } from './AnnouncementService';

// إنشاء معاملة دفع جديدة
export const createPayment = async (userId, announcementId, amount, paymentMethod) => {
  try {
    // إنشاء وثيقة الدفع في Firestore
    const paymentRef = await addDoc(collection(db, 'payments'), {
      user_id: userId,
      announcement_id: announcementId,
      amount,
      payment_method: paymentMethod,
      transaction_id: generateTransactionId(),
      payment_date: serverTimestamp(),
      status: 'pending' // حالة الدفع الأولية: معلق
    });
    
    return {
      success: true,
      payment_id: paymentRef.id,
      transaction_id: paymentRef.transaction_id
    };
  } catch (error) {
    console.error('خطأ في إنشاء معاملة الدفع:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تحديث حالة الدفع
export const updatePaymentStatus = async (paymentId, status) => {
  try {
    // تحديث وثيقة الدفع
    const paymentRef = doc(db, 'payments', paymentId);
    await updateDoc(paymentRef, {
      status,
      updated_at: serverTimestamp()
    });
    
    // إذا كان الدفع ناجحًا، قم بتحديث حالة الإعلان
    if (status === 'success') {
      // الحصول على معرف الإعلان من وثيقة الدفع
      const paymentDoc = await getDoc(paymentRef);
      if (paymentDoc.exists()) {
        const announcementId = paymentDoc.data().announcement_id;
        // تحديث حالة الإعلان إلى مدفوع ونشط
        await updateAnnouncementPaymentStatus(announcementId, 'paid', true);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث حالة الدفع:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// الحصول على تفاصيل الدفع
export const getPaymentDetails = async (paymentId) => {
  try {
    const paymentRef = doc(db, 'payments', paymentId);
    const paymentDoc = await getDoc(paymentRef);
    
    if (paymentDoc.exists()) {
      return {
        success: true,
        payment: {
          id: paymentDoc.id,
          ...paymentDoc.data(),
          payment_date: paymentDoc.data().payment_date?.toDate().toISOString() || new Date().toISOString()
        }
      };
    } else {
      throw new Error('معاملة الدفع غير موجودة');
    }
  } catch (error) {
    console.error('خطأ في جلب تفاصيل الدفع:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// توليد معرف معاملة فريد
const generateTransactionId = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000000);
  return `TRX-${timestamp}-${randomNum}`;
};

// محاكاة عملية الدفع (للاختبار فقط)
export const simulatePaymentProcess = async (paymentId) => {
  try {
    // محاكاة تأخير عملية الدفع
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // محاكاة نجاح الدفع (في الإنتاج، سيتم استبدال هذا بمعالجة حقيقية من بوابة الدفع)
    const success = Math.random() > 0.2; // 80% فرصة للنجاح
    
    if (success) {
      await updatePaymentStatus(paymentId, 'success');
      return {
        success: true,
        status: 'success',
        message: 'تمت عملية الدفع بنجاح'
      };
    } else {
      await updatePaymentStatus(paymentId, 'failed');
      return {
        success: false,
        status: 'failed',
        message: 'فشلت عملية الدفع، يرجى المحاولة مرة أخرى'
      };
    }
  } catch (error) {
    console.error('خطأ في محاكاة عملية الدفع:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
