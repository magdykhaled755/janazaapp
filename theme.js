// ملف الألوان الرئيسية للتطبيق
export const COLORS = {
  primary: '#000000', // أسود
  secondary: '#FFEB3B', // أصفر
  white: '#FFFFFF', // أبيض
  gray: '#9E9E9E', // رمادي
  lightGray: '#E0E0E0', // رمادي فاتح
  darkGray: '#616161', // رمادي داكن
  background: '#F5F5F5', // خلفية
  error: '#FF5252', // أحمر للأخطاء
  success: '#4CAF50', // أخضر للنجاح
  transparent: 'transparent', // شفاف
};

// أنماط الخطوط
export const FONT_SIZES = {
  small: 12,
  medium: 14,
  regular: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
  title: 28,
};

// أنماط الهوامش والحشوات
export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

// أنماط الظلال
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};
