import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from '../utils/theme';

/**
 * مكون الزر المخصص للتطبيق
 * @param {string} title - عنوان الزر
 * @param {function} onPress - الدالة التي تنفذ عند الضغط على الزر
 * @param {string} type - نوع الزر (primary, secondary, outline)
 * @param {boolean} disabled - حالة تعطيل الزر
 * @param {object} style - أنماط إضافية للزر
 */
const CustomButton = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  style,
}) => {
  // تحديد لون الخلفية بناءً على نوع الزر
  const getBackgroundColor = () => {
    if (disabled) return COLORS.gray;
    
    switch (type) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.secondary;
      case 'outline':
        return COLORS.transparent;
      default:
        return COLORS.primary;
    }
  };

  // تحديد لون النص بناءً على نوع الزر
  const getTextColor = () => {
    if (disabled) return COLORS.lightGray;
    
    switch (type) {
      case 'primary':
        return COLORS.white;
      case 'secondary':
        return COLORS.primary;
      case 'outline':
        return COLORS.primary;
      default:
        return COLORS.white;
    }
  };

  // تحديد نمط الحدود بناءً على نوع الزر
  const getBorderStyle = () => {
    if (type === 'outline') {
      return {
        borderWidth: 1,
        borderColor: disabled ? COLORS.gray : COLORS.primary,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getBorderStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: getTextColor() }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  buttonText: {
    fontSize: FONT_SIZES.regular,
    fontWeight: 'bold',
  },
});

export default CustomButton;
