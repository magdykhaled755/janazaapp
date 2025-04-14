// خدمات المصادقة وإدارة المستخدمين
import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// تسجيل مستخدم جديد
export const registerUser = async (name, phone, neighborhood, password) => {
  try {
    // إنشاء بريد إلكتروني وهمي باستخدام رقم الهاتف (لأغراض المصادقة)
    const email = `${phone}@janaza-app.com`;
    
    // إنشاء المستخدم في نظام المصادقة
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // إنشاء وثيقة المستخدم في Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      phone,
      neighborhood,
      created_at: new Date().toISOString(),
      fcm_token: null
    });
    
    return {
      success: true,
      user: {
        id: user.uid,
        name,
        phone,
        neighborhood
      }
    };
  } catch (error) {
    console.error('خطأ في تسجيل المستخدم:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تسجيل الدخول
export const loginUser = async (phone, password) => {
  try {
    // تحويل رقم الهاتف إلى بريد إلكتروني وهمي
    const email = `${phone}@janaza-app.com`;
    
    // تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // جلب بيانات المستخدم من Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      return {
        success: true,
        user: {
          id: user.uid,
          name: userData.name,
          phone: userData.phone,
          neighborhood: userData.neighborhood
        }
      };
    } else {
      throw new Error('لم يتم العثور على بيانات المستخدم');
    }
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تسجيل الخروج
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// إعادة تعيين كلمة المرور
export const resetPassword = async (phone) => {
  try {
    const email = `${phone}@janaza-app.com`;
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('خطأ في إعادة تعيين كلمة المرور:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// تحديث رمز إشعارات Firebase للمستخدم
export const updateFCMToken = async (userId, token) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
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
