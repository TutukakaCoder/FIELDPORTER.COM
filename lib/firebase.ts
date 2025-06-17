import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZR7qSS_dTN3eNHXIRoDHAG1TB_GcjwqI',
  authDomain: 'fieldporter-website.firebaseapp.com',
  projectId: 'fieldporter-website',
  storageBucket: 'fieldporter-website.firebasestorage.app',
  messagingSenderId: '412133715476',
  appId: '1:412133715476:web:924be61903196cfbe50101',
  measurementId: 'G-4YGGNZYQ1J',
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;

// Initialize Firestore
export const db = getFirestore(app);

export default app;
