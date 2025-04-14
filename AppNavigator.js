// تكوين نظام التنقل
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// استيراد الشاشات (سيتم إنشاؤها لاحقًا)
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import AnnouncementScreen from '../screens/AnnouncementScreen';
// import CreateAnnouncementScreen from '../screens/CreateAnnouncementScreen';
// import PaymentScreen from '../screens/PaymentScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#FFEB3B',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'إنشاء حساب' }} />
        <Stack.Screen name="Announcement" component={AnnouncementScreen} options={{ title: 'تفاصيل الوفاة' }} />
        <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} options={{ title: 'إنشاء إعلان' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'الدفع' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
