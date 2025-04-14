import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { registerForPushNotificationsAsync } from './src/services/NotificationService';

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // تسجيل الجهاز للإشعارات
    registerForPushNotificationsAsync().then(token => {
      console.log('Expo Push Token:', token);
    });

    // الاستماع للإشعارات الواردة عندما يكون التطبيق في المقدمة
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // الاستماع للتفاعل مع الإشعارات
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      // يمكن هنا توجيه المستخدم إلى الشاشة المناسبة بناءً على بيانات الإشعار
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
