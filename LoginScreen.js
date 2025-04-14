import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from '../utils/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!phone) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
      isValid = false;
    } else if (!/^\d{11}$/.test(phone)) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح مكون من 11 رقم';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'يرجى إدخال كلمة المرور';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // سيتم تنفيذ عملية تسجيل الدخول هنا
      console.log('تسجيل الدخول باستخدام:', { phone, password });
      // للاختبار، سننتقل إلى الشاشة الرئيسية
      // navigation.navigate('Home');
    }
  };

  const handleRegister = () => {
    // الانتقال إلى شاشة التسجيل
    // navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>جنازة</Text>
          <Text style={styles.logoSubText}>Janaza</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>مرحبًا بك</Text>
          <Text style={styles.instructionText}>يرجى تسجيل الدخول للمتابعة</Text>

          <CustomInput
            label="رقم الهاتف"
            value={phone}
            onChangeText={setPhone}
            placeholder="أدخل رقم الهاتف"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <CustomInput
            label="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            placeholder="أدخل كلمة المرور"
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
          </TouchableOpacity>

          <CustomButton
            title="تسجيل الدخول"
            onPress={handleLogin}
            type="primary"
            style={styles.loginButton}
          />

          <View style={styles.registerContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerText}>إنشاء حساب</Text>
            </TouchableOpacity>
            <Text style={styles.noAccountText}>ليس لديك حساب؟</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SPACING.l,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  logoSubText: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.l,
    ...SHADOWS.medium,
  },
  welcomeText: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'right',
    marginBottom: SPACING.xs,
  },
  instructionText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.gray,
    textAlign: 'right',
    marginBottom: SPACING.l,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.l,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: SPACING.m,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.l,
  },
  noAccountText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  registerText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
