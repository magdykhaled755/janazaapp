// تكوين نظام إدارة الحالة باستخدام Context API
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// إنشاء السياق
const AppContext = createContext();

// الحالة الأولية
const initialState = {
  user: null,
  isAuthenticated: false,
  announcements: [],
  loading: false,
  error: null
};

// المخفض (Reducer)
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'SET_ANNOUNCEMENTS':
      return { ...state, announcements: action.payload };
    case 'ADD_ANNOUNCEMENT':
      return { ...state, announcements: [action.payload, ...state.announcements] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

// مزود السياق
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // تحميل بيانات المستخدم من التخزين المحلي عند بدء التطبيق
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          dispatch({ type: 'SET_USER', payload: JSON.parse(userData) });
        }
      } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
      }
    };

    loadUserData();
  }, []);

  // حفظ بيانات المستخدم في التخزين المحلي عند تغييرها
  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (state.user) {
          await AsyncStorage.setItem('user', JSON.stringify(state.user));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } catch (error) {
        console.error('خطأ في حفظ بيانات المستخدم:', error);
      }
    };

    saveUserData();
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// هوك مخصص لاستخدام السياق
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('يجب استخدام useAppContext داخل AppProvider');
  }
  return context;
};
