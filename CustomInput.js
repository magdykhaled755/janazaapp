import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../utils/theme';

/**
 * مكون حقل الإدخال المخصص للتطبيق
 * @param {string} label - عنوان الحقل
 * @param {string} value - قيمة الحقل
 * @param {function} onChangeText - دالة تنفذ عند تغيير النص
 * @param {string} placeholder - نص توضيحي يظهر عندما يكون الحقل فارغًا
 * @param {boolean} secureTextEntry - إذا كان الحقل لكلمة مرور
 * @param {string} keyboardType - نوع لوحة المفاتيح
 * @param {boolean} multiline - إذا كان الحقل متعدد الأسطر
 * @param {object} style - أنماط إضافية للحقل
 * @param {string} error - رسالة الخطأ
 */
const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  style,
  error,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlign="right"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
    width: '100%',
  },
  label: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    fontSize: FONT_SIZES.regular,
    color: COLORS.primary,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
});

export default CustomInput;
