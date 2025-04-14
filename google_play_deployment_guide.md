# دليل نشر تطبيق "جنازة" على متجر Google Play

## المتطلبات الأساسية

### 1. حساب مطور Google Play
- قم بالتسجيل في [حساب مطور Google Play](https://play.google.com/console/signup)
- دفع رسوم التسجيل لمرة واحدة (25 دولار أمريكي)
- إكمال معلومات الملف الشخصي للمطور

### 2. ملفات التطبيق المطلوبة
- ملف APK أو حزمة Android App Bundle (AAB) - يفضل استخدام AAB
- رمز التطبيق (512×512 بكسل)
- صورة العرض الترويجي (1024×500 بكسل)
- لقطات شاشة للتطبيق (بحد أدنى لقطتين)
- وصف قصير للتطبيق (حتى 80 حرفًا)
- وصف كامل للتطبيق (حتى 4000 حرف)

## خطوات إنشاء ملف APK/AAB للنشر

### 1. تحضير التطبيق للإنتاج
```bash
# الانتقال إلى مجلد المشروع
cd /home/ubuntu/janaza-app/janaza-mobile

# تثبيت eas-cli
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
      "bundleIdentifier": "com.yourcompany.janaza"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "package": "com.yourcompany.janaza",
      "versionCode": 1,
      "permissions": [
        "NOTIFICATIONS"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 3. بناء ملف AAB للنشر
```bash
# بناء ملف AAB للأندرويد
eas build --platform android --profile production
```

### 4. تنزيل ملف AAB
بعد اكتمال عملية البناء، قم بتنزيل ملف AAB من لوحة تحكم Expo EAS.

## خطوات النشر على Google Play

### 1. إنشاء تطبيق جديد
- قم بتسجيل الدخول إلى [Google Play Console](https://play.google.com/console)
- انقر على "إنشاء تطبيق"
- أدخل اسم التطبيق "جنازة" واختر اللغة "العربية"
- حدد ما إذا كان التطبيق لعبة أم تطبيقًا
- حدد ما إذا كان التطبيق مجانيًا أم مدفوعًا

### 2. إعداد قائمة التطبيق
- **معلومات المنتج**:
  - أدخل الوصف القصير والكامل للتطبيق
  - قم بتحميل رمز التطبيق وصورة العرض الترويجي
  - قم بتحميل لقطات الشاشة للهواتف والأجهزة اللوحية
  - حدد نوع التطبيق وفئته (مثلاً: الأدوات، المجتمع)
  - أدخل عنوان البريد الإلكتروني للدعم وموقع الويب

- **تصنيف المحتوى**:
  - أكمل استبيان تصنيف المحتوى
  - سيتم تعيين تصنيف عمري للتطبيق بناءً على إجاباتك

- **سياسة الخصوصية**:
  - أدخل رابط سياسة الخصوصية (إلزامي)

### 3. إعداد الإصدار
- انتقل إلى "إنتاج" في القائمة الجانبية
- انقر على "إنشاء إصدار"
- قم بتحميل ملف AAB الذي قمت بإنشائه
- أدخل ملاحظات الإصدار
- انقر على "مراجعة"

### 4. نشر التطبيق
- بعد مراجعة جميع المعلومات، انقر على "بدء النشر إلى الإنتاج"
- انتظر حتى تتم مراجعة التطبيق من قبل Google (قد تستغرق من بضع ساعات إلى عدة أيام)
- بمجرد الموافقة، سيتم نشر التطبيق على Google Play

## نصائح مهمة
- تأكد من اختبار التطبيق جيدًا قبل النشر
- قم بإعداد سياسة خصوصية واضحة
- تأكد من أن التطبيق يتوافق مع [سياسات المطورين لـ Google Play](https://play.google.com/about/developer-content-policy/)
- استخدم الإصدارات التجريبية المغلقة أو المفتوحة قبل النشر الكامل للتأكد من عدم وجود مشاكل

## الدعم والمساعدة
- [مركز مساعدة Google Play للمطورين](https://support.google.com/googleplay/android-developer)
- [مجتمع مطوري Google Play](https://support.google.com/googleplay/android-developer/community)
