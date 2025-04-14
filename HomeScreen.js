import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from '../utils/theme';
import AnnouncementCard from '../components/AnnouncementCard';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  // بيانات وهمية للإعلانات للعرض التوضيحي
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      deceased_name: 'الحاج محمد أحمد علي',
      funeral_location: 'مسجد النور - بلقاس',
      funeral_time: new Date().toISOString(),
      condolences_location: 'منزل العائلة - شارع الجمهورية',
      condolences_time: new Date(Date.now() + 86400000).toISOString(), // بعد يوم واحد
      additional_details: 'والد كل من أحمد ومحمود وعم المهندس خالد',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      deceased_name: 'الحاجة فاطمة محمود',
      funeral_location: 'مسجد التقوى - بلقاس',
      funeral_time: new Date().toISOString(),
      created_at: new Date(Date.now() - 3600000).toISOString(), // قبل ساعة
    },
  ]);

  const handleAnnouncementPress = (announcement) => {
    // الانتقال إلى شاشة تفاصيل الإعلان
    // navigation.navigate('Announcement', { announcement });
  };

  const handleCreateAnnouncement = () => {
    // الانتقال إلى شاشة إنشاء إعلان جديد
    // navigation.navigate('CreateAnnouncement');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>آخر الوفيات</Text>
      <Text style={styles.headerSubtitle}>مدينة بلقاس - محافظة الدقهلية</Text>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>لا توجد إعلانات حالية</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnnouncementCard
            announcement={item}
            onPress={() => handleAnnouncementPress(item)}
            style={styles.card}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
      />
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="إنشاء إعلان جديد"
          onPress={handleCreateAnnouncement}
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  headerTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.white,
  },
  listContainer: {
    padding: SPACING.m,
    paddingBottom: SPACING.xxl,
  },
  card: {
    marginBottom: SPACING.m,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.gray,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: SPACING.l,
    left: SPACING.l,
    right: SPACING.l,
  },
});

export default HomeScreen;
