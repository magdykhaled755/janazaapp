import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from '../utils/theme';

/**
 * مكون بطاقة إعلان الوفاة
 * @param {object} announcement - بيانات إعلان الوفاة
 * @param {function} onPress - الدالة التي تنفذ عند الضغط على البطاقة
 * @param {object} style - أنماط إضافية للبطاقة
 */
const AnnouncementCard = ({ announcement, onPress, style }) => {
  // تنسيق التاريخ والوقت
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.deceasedName}>{announcement.deceased_name}</Text>
        <Text style={styles.date}>{formatDateTime(announcement.created_at)}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>مكان الجنازة:</Text>
          <Text style={styles.detailValue}>{announcement.funeral_location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>موعد الجنازة:</Text>
          <Text style={styles.detailValue}>{formatDateTime(announcement.funeral_time)}</Text>
        </View>
        
        {announcement.condolences_location && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>مكان العزاء:</Text>
            <Text style={styles.detailValue}>{announcement.condolences_location}</Text>
          </View>
        )}
        
        {announcement.condolences_time && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>توقيت العزاء:</Text>
            <Text style={styles.detailValue}>{formatDateTime(announcement.condolences_time)}</Text>
          </View>
        )}
        
        {announcement.additional_details && (
          <View style={styles.additionalDetails}>
            <Text style={styles.additionalDetailsText}>{announcement.additional_details}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.viewMore}>اضغط للمزيد من التفاصيل</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.medium,
    borderRightWidth: 4,
    borderRightColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: SPACING.s,
  },
  deceasedName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  date: {
    fontSize: FONT_SIZES.small,
    color: COLORS.gray,
  },
  detailsContainer: {
    marginBottom: SPACING.m,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginLeft: SPACING.s,
  },
  detailValue: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
  },
  additionalDetails: {
    backgroundColor: COLORS.lightGray,
    padding: SPACING.s,
    borderRadius: 8,
    marginTop: SPACING.s,
  },
  additionalDetailsText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    textAlign: 'right',
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.s,
  },
  viewMore: {
    fontSize: FONT_SIZES.small,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});

export default AnnouncementCard;
