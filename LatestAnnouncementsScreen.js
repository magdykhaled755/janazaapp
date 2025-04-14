import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, SHADOWS } from '../utils/theme';
import AnnouncementCard from '../components/AnnouncementCard';
import { getActiveAnnouncements } from '../services/AnnouncementService';
import { useAppContext } from '../context/AppContext';

const LatestAnnouncementsScreen = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // جلب آخر الإعلانات
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getActiveAnnouncements();
      
      if (result.success) {
        dispatch({ type: 'SET_ANNOUNCEMENTS', payload: result.announcements });
      } else {
        setError('حدث خطأ أثناء جلب الإعلانات');
      }
    } catch (error) {
      console.error('خطأ في جلب الإعلانات:', error);
      setError('حدث خطأ أثناء جلب الإعلانات');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // جلب الإعلانات عند تحميل الشاشة
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // تحديث الإعلانات عند السحب للتحديث
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnnouncements();
  };

  // التعامل مع الضغط على إعلان
  const handleAnnouncementPress = (announcement) => {
    navigation.navigate('Announcement', { announcementId: announcement.id });
  };

  // عرض رسالة عند عدم وجود إعلانات
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>لا توجد إعلانات حالية</Text>
    </View>
  );

  // عرض مؤشر التحميل
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>جاري تحميل الإعلانات...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>آخر الوفيات</Text>
        <Text style={styles.headerSubtitle}>مدينة بلقاس - محافظة الدقهلية</Text>
      </View>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={state.announcements}
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary, COLORS.secondary]}
              tintColor={COLORS.primary}
            />
          }
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.m,
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.l,
  },
  errorText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.error,
    textAlign: 'center',
  },
});

export default LatestAnnouncementsScreen;
