// اختبار وظائف تطبيق "جنازة"
import { registerUser, loginUser } from '../services/AuthService';
import { createAnnouncement, getActiveAnnouncements, getAnnouncementDetails } from '../services/AnnouncementService';
import { createPayment, updatePaymentStatus, simulatePaymentProcess } from '../services/PaymentService';
import { sendLocalNotification } from '../services/NotificationService';

// اختبار تسجيل المستخدمين
export const testUserRegistration = async () => {
  console.log('=== بدء اختبار تسجيل المستخدمين ===');
  
  try {
    // اختبار تسجيل مستخدم جديد
    const registerResult = await registerUser(
      'مستخدم اختبار',
      '01234567890',
      'حي الزهور - بلقاس',
      'password123'
    );
    
    console.log('نتيجة تسجيل المستخدم:', registerResult);
    
    if (registerResult.success) {
      console.log('✅ نجح اختبار تسجيل المستخدم');
      
      // اختبار تسجيل الدخول
      const loginResult = await loginUser('01234567890', 'password123');
      console.log('نتيجة تسجيل الدخول:', loginResult);
      
      if (loginResult.success) {
        console.log('✅ نجح اختبار تسجيل الدخول');
        return {
          success: true,
          userId: loginResult.user.id
        };
      } else {
        console.log('❌ فشل اختبار تسجيل الدخول');
        return {
          success: false,
          error: 'فشل تسجيل الدخول'
        };
      }
    } else {
      console.log('❌ فشل اختبار تسجيل المستخدم');
      return {
        success: false,
        error: 'فشل تسجيل المستخدم'
      };
    }
  } catch (error) {
    console.error('خطأ في اختبار تسجيل المستخدمين:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// اختبار إنشاء الإعلانات
export const testAnnouncementCreation = async (userId) => {
  console.log('=== بدء اختبار إنشاء الإعلانات ===');
  
  try {
    // بيانات إعلان اختباري
    const announcementData = {
      deceased_name: 'المرحوم عبدالله محمد',
      funeral_location: 'مسجد السلام - بلقاس',
      funeral_time: new Date().toISOString(),
      condolences_location: 'قاعة العزاء - شارع الجمهورية',
      condolences_time: new Date(Date.now() + 86400000).toISOString(), // بعد يوم واحد
      additional_details: 'والد كل من محمد وأحمد وعلي'
    };
    
    // إنشاء إعلان جديد
    const createResult = await createAnnouncement(userId, announcementData);
    console.log('نتيجة إنشاء الإعلان:', createResult);
    
    if (createResult.success) {
      console.log('✅ نجح اختبار إنشاء الإعلان');
      
      // اختبار جلب تفاصيل الإعلان
      const detailsResult = await getAnnouncementDetails(createResult.announcement_id);
      console.log('نتيجة جلب تفاصيل الإعلان:', detailsResult);
      
      if (detailsResult.success) {
        console.log('✅ نجح اختبار جلب تفاصيل الإعلان');
      } else {
        console.log('❌ فشل اختبار جلب تفاصيل الإعلان');
      }
      
      return {
        success: true,
        announcementId: createResult.announcement_id
      };
    } else {
      console.log('❌ فشل اختبار إنشاء الإعلان');
      return {
        success: false,
        error: 'فشل إنشاء الإعلان'
      };
    }
  } catch (error) {
    console.error('خطأ في اختبار إنشاء الإعلانات:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// اختبار نظام الدفع
export const testPaymentSystem = async (userId, announcementId) => {
  console.log('=== بدء اختبار نظام الدفع ===');
  
  try {
    // إنشاء معاملة دفع جديدة
    const createPaymentResult = await createPayment(
      userId,
      announcementId,
      50.0, // مبلغ الدفع
      'credit_card' // طريقة الدفع
    );
    
    console.log('نتيجة إنشاء معاملة الدفع:', createPaymentResult);
    
    if (createPaymentResult.success) {
      console.log('✅ نجح اختبار إنشاء معاملة الدفع');
      
      // محاكاة عملية الدفع
      const simulateResult = await simulatePaymentProcess(createPaymentResult.payment_id);
      console.log('نتيجة محاكاة عملية الدفع:', simulateResult);
      
      if (simulateResult.success) {
        console.log('✅ نجح اختبار محاكاة عملية الدفع');
      } else {
        console.log('❌ فشل اختبار محاكاة عملية الدفع');
      }
      
      return {
        success: true,
        paymentId: createPaymentResult.payment_id
      };
    } else {
      console.log('❌ فشل اختبار إنشاء معاملة الدفع');
      return {
        success: false,
        error: 'فشل إنشاء معاملة الدفع'
      };
    }
  } catch (error) {
    console.error('خطأ في اختبار نظام الدفع:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// اختبار نظام الإشعارات
export const testNotificationSystem = async () => {
  console.log('=== بدء اختبار نظام الإشعارات ===');
  
  try {
    // إرسال إشعار محلي للاختبار
    const notificationResult = await sendLocalNotification(
      'إشعار اختباري',
      'هذا إشعار لاختبار نظام الإشعارات في تطبيق جنازة',
      { test: true }
    );
    
    console.log('نتيجة إرسال الإشعار المحلي:', notificationResult);
    
    if (notificationResult.success) {
      console.log('✅ نجح اختبار إرسال الإشعار المحلي');
      return { success: true };
    } else {
      console.log('❌ فشل اختبار إرسال الإشعار المحلي');
      return {
        success: false,
        error: 'فشل إرسال الإشعار المحلي'
      };
    }
  } catch (error) {
    console.error('خطأ في اختبار نظام الإشعارات:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تشغيل جميع الاختبارات
export const runAllTests = async () => {
  console.log('=== بدء تشغيل جميع الاختبارات ===');
  
  try {
    // اختبار تسجيل المستخدمين
    const userResult = await testUserRegistration();
    if (!userResult.success) {
      console.log('❌ فشلت الاختبارات في مرحلة تسجيل المستخدمين');
      return { success: false };
    }
    
    // اختبار إنشاء الإعلانات
    const announcementResult = await testAnnouncementCreation(userResult.userId);
    if (!announcementResult.success) {
      console.log('❌ فشلت الاختبارات في مرحلة إنشاء الإعلانات');
      return { success: false };
    }
    
    // اختبار نظام الدفع
    const paymentResult = await testPaymentSystem(userResult.userId, announcementResult.announcementId);
    if (!paymentResult.success) {
      console.log('❌ فشلت الاختبارات في مرحلة نظام الدفع');
      return { success: false };
    }
    
    // اختبار نظام الإشعارات
    const notificationResult = await testNotificationSystem();
    if (!notificationResult.success) {
      console.log('❌ فشلت الاختبارات في مرحلة نظام الإشعارات');
      return { success: false };
    }
    
    console.log('✅ نجحت جميع الاختبارات');
    return { success: true };
  } catch (error) {
    console.error('خطأ في تشغيل الاختبارات:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
