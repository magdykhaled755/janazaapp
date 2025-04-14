// تكوين Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// تكوين Firebase - يجب استبدال هذه القيم بقيم حقيقية عند نشر التطبيق
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "janaza-app.firebaseapp.com",
  projectId: "janaza-app",
  storageBucket: "janaza-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
