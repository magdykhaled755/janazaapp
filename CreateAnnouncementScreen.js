import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from '../utils/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const CreateAnnouncementScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    deceased_name: '',
    funeral_location: '',
    funeral_date: '',
    funeral_time: '',
    has_condolences: false,
    condolences_location: '',
    condolences_date: '',
    condolences_time: '',
    additional_details: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // مسح رسالة الخطأ عند تغيير القيمة
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.deceased_name) {
      newErrors.deceased_name = 'يرجى إدخال اسم المتوفى';
      isValid = false;
    }

    if (!formData.funeral_location) {
      newErrors.funeral_location = 'يرجى إدخال مكان الجنازة';
      isValid = false;
    }

    if (!formData.funeral_date) {
      newErrors.funeral_date = 'يرجى إدخال تاريخ الجنازة';
      isValid = false;
    }

    if (!formData.funeral_time) {
      newErrors.funeral_time = 'يرجى إدخال وقت الجنازة';
      isValid = false;
    }

    if (formData.has_condolences) {
      if (!formData.condolences_location) {
        newErrors.condolences_location = 'يرجى إدخال مكان العزاء';
        isValid = false;
      }

      if (!formData.condolences_date) {
        newErrors.condolences_date = 'يرجى إدخال تاريخ العزاء';
        isValid = false;
      }

      if (!formData.condolences_time) {
        newErrors.condolences_time = 'يرجى إدخال وقت العزاء';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // سيتم تنفيذ عملية إنشاء الإعلان هنا
      console.log('إنشاء إعلان جديد:', formData);
      // الانتقال إلى شاشة الدفع
      // navigation.navigate('Payment', { announcementData: formData });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>إنشاء إعلان جديد</Text>
          <Text style={styles.headerSubtitle}>أدخل بيانات المتوفى</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            label="اسم المتوفى"
            value={formData.deceased_name}
            onChangeText={(value) => handleChange('deceased_name', value)}
            placeholder="أدخل اسم المتوفى بالكامل"
            error={errors.deceased_name}
          />

          <CustomInput
            label="مكان الجنازة"
            value={formData.funeral_location}
            onChangeText={(value) => handleChange('funeral_location', value)}
            placeholder="أدخل مكان الجنازة"
            error={errors.funeral_location}
          />

          <View style={styles.rowContainer}>
            <CustomInput
              label="تاريخ الجنازة"
              value={formData.funeral_date}
              onChangeText={(value) => handleChange('funeral_date', value)}
              placeholder="يوم/شهر/سنة"
              keyboardType="numeric"
              error={errors.funeral_date}
              style={styles.halfInput}
            />

            <CustomInput
              label="وقت الجنازة"
              value={formData.funeral_time}
              onChangeText={(value) => handleChange('funeral_time', value)}
              placeholder="ساعة:دقيقة"
              keyboardType="numeric"
              error={errors.funeral_time}
              style={styles.halfInput}
            />
          </View>

          <View style={styles.switchContainer}>
            <Switch
              value={formData.has_condolences}
              onValueChange={(value) => handleChange('has_condolences', value)}
              trackColor={{ false: COLORS.gray, true: COLORS.secondary }}
              thumbColor={formData.has_condolences ? COLORS.primary : COLORS.white}
            />
            <Text style={styles.switchLabel}>إضافة معلومات العزاء</Text>
          </View>

          {formData.has_condolences && (
            <>
              <CustomInput
                label="مكان العزاء"
                value={formData.condolences_location}
                onChangeText={(value) => handleChange('condolences_location', value)}
                placeholder="أدخل مكان العزاء"
                error={errors.condolences_location}
              />

              <View style={styles.rowContainer}>
                <CustomInput
                  label="تاريخ العزاء"
                  value={formData.condolences_date}
                  onChangeText={(value) => handleChange('condolences_date', value)}
                  placeholder="يوم/شهر/سنة"
                  keyboardType="numeric"
                  error={errors.condolences_date}
                  style={styles.halfInput}
                />

                <CustomInput
                  label="وقت العزاء"
                  value={formData.condolences_time}
                  onChangeText={(value) => handleChange('condolences_time', value)}
                  placeholder="ساعة:دقيقة"
                  keyboardType="numeric"
                  error={errors.condolences_time}
                  style={styles.halfInput}
                />
              </View>
            </>
          )}

          <CustomInput
            label="تفاصيل إضافية"
            value={formData.additional_details}
            onChangeText={(value) => handleChange('additional_details', value)}
            placeholder="أدخل أي تفاصيل إضافية عن المتوفى (اختياري)"
            multiline
          />

          <CustomButton
            title="متابعة للدفع"
            onPress={handleSubmit}
            type="primary"
            style={styles.submitButton}
          />
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
    padding: SPACING.m,
  },
  header: {
    alignItems: 'center',
    marginVertical: SPACING.l,
  },
  headerTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.gray,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.l,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: SPACING.m,
  },
  switchLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginRight: SPACING.s,
  },
  submitButton: {
    marginTop: SPACING.l,
  },
});

export default CreateAnnouncementScreen;
