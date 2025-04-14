# دليل نشر تطبيق "جنازة" على متجر App Store

## المتطلبات الأساسية

### 1. حساب مطور Apple
- قم بالتسجيل في [برنامج مطوري Apple](https://developer.apple.com/programs/)
- دفع رسوم الاشتراك السنوية (99 دولار أمريكي في السنة)
- إكمال معلومات الملف الشخصي للمطور

### 2. الأجهزة والبرامج المطلوبة
- جهاز Mac يعمل بنظام macOS الحديث
- تثبيت Xcode (أحدث إصدار)
- شهادات التطوير والتوزيع من Apple

### 3. ملفات التطبيق المطلوبة
- ملف IPA للتطبيق
- رمز التطبيق (1024×1024 بكسل)
- لقطات شاشة للتطبيق (بحد أدنى لقطة لكل حجم جهاز)
- مقطع فيديو ترويجي (اختياري)
- وصف قصير للتطبيق (حتى 30 حرفًا)
- وصف كامل للتطبيق (حتى 4000 حرف)
- الكلمات المفتاحية للبحث

## خطوات إنشاء ملف IPA للنشر

### 1. تحضير التطبيق للإنتاج
```bash
# الانتقال إلى مجلد المشروع
cd /home/ubuntu/janaza-app/janaza-mobile

# تثبيت eas-cli إذا لم يكن مثبتًا بالفعل
npm install -g eas-cli

# تسجيل الدخول إلى حساب Expo
eas login

# تكوين المشروع للبناء
eas build:configure
```

### 2. تعديل ملف app.json
تأكد من تحديث المعلومات التالية في ملف app.json:
```json
{
  "expo": {
    "name": "جنازة",
    "slug": "janaza",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.janaza",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "هذا التطبيق لا يستخدم الكاميرا",
        "NSPhotoLibraryUsageDescription": "هذا التطبيق لا يستخدم مكتبة الصور",
        "NSLocationWhenInUseUsageDescription": "هذا التطبيق لا يستخدم الموقع",
        "UIBackgroundModes": ["remote-notification"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "package": "com.yourcompany.janaza",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 3. بناء ملف IPA للنشر
```bash
# بناء ملف IPA للـ iOS
eas build --platform ios --profile production
```

### 4. تنزيل ملف IPA
بعد اكتمال عملية البناء، قم بتنزيل ملف IPA من لوحة تحكم Expo EAS.

## خطوات النشر على App Store

### 1. إنشاء تطبيق جديد في App Store Connect
- قم بتسجيل الدخول إلى [App Store Connect](https://appstoreconnect.apple.com/)
- انتقل إلى "تطبيقاتي"
- انقر على زر "+" لإنشاء تطبيق جديد
- أدخل معلومات التطبيق الأساسية:
  - منصة التطبيق: iOS
  - اسم التطبيق: جنازة
  - اللغة الأساسية: العربية
  - معرف حزمة التطبيق (Bundle ID): com.yourcompany.janaza
  - معرف SKU: رمز فريد خاص بك
  - حدد ما إذا كان التطبيق مجانيًا أم مدفوعًا

### 2. إعداد معلومات التطبيق
- **معلومات قائمة التطبيق**:
  - أدخل الوصف القصير والكامل للتطبيق
  - قم بتحميل رمز التطبيق
  - قم بتحميل لقطات الشاشة لجميع أحجام الأجهزة المدعومة
  - أدخل الكلمات المفتاحية للبحث
  - أدخل عنوان URL لموقع الدعم وعنوان البريد الإلكتروني للدعم
  - أدخل معلومات حقوق النشر

- **معلومات الإصدار**:
  - أدخل ملاحظات الإصدار
  - حدد معلومات الاتصال للمراجعة

- **تصنيف المحتوى**:
  - أكمل استبيان تصنيف المحتوى
  - سيتم تعيين تصنيف عمري للتطبيق بناءً على إجاباتك

- **سياسة الخصوصية**:
  - أدخل رابط سياسة الخصوصية (إلزامي)

### 3. تحميل ملف البناء
- انتقل إلى قسم "بناء" في App Store Connect
- قم بتحميل ملف IPA باستخدام Xcode أو Transporter
- انتظر حتى تتم معالجة الملف (قد يستغرق ذلك بضع دقائق)
- بمجرد معالجة الملف، حدده للإصدار الذي تريد نشره

### 4. إرسال التطبيق للمراجعة
- تأكد من إكمال جميع المعلومات المطلوبة
- انقر على "حفظ" ثم "إرسال للمراجعة"
- أجب عن أي أسئلة إضافية قد تظهر
- انتظر حتى تتم مراجعة التطبيق من قبل Apple (قد تستغرق من يوم إلى عدة أيام)
- بمجرد الموافقة، يمكنك نشر التطبيق على App Store

## نصائح مهمة
- تأكد من اختبار التطبيق جيدًا على أجهزة iOS الفعلية قبل النشر
- اتبع [إرشادات مراجعة App Store](https://developer.apple.com/app-store/review/guidelines/) بدقة
- قم بإعداد سياسة خصوصية واضحة ومتوافقة مع متطلبات Apple
- استخدم TestFlight لاختبار التطبيق قبل إرساله للمراجعة النهائية
- تأكد من أن التطبيق يعمل بشكل صحيح على جميع أحجام الشاشات المدعومة

## الدعم والمساعدة
- [مركز مساعدة مطوري Apple](https://developer.apple.com/support/)
- [مجتمع مطوري Apple](https://developer.apple.com/forums/)
- [وثائق App Store Connect](https://developer.apple.com/app-store-connect/)
