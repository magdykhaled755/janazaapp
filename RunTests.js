// سكريبت لتشغيل الاختبارات
import { runAllTests } from './AppTests';

// تشغيل جميع الاختبارات عند تنفيذ هذا الملف
const runTests = async () => {
  console.log('بدء تشغيل اختبارات تطبيق "جنازة"...');
  
  try {
    const result = await runAllTests();
    
    if (result.success) {
      console.log('✅ تم اجتياز جميع الاختبارات بنجاح');
    } else {
      console.log('❌ فشلت بعض الاختبارات');
      if (result.error) {
        console.error('السبب:', result.error);
      }
    }
  } catch (error) {
    console.error('حدث خطأ أثناء تشغيل الاختبارات:', error);
  }
};

// تشغيل الاختبارات
runTests();
