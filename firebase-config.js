import { initializeApp, initializeAuth } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, getAuth, GoogleAuthProvider } from 'firebase/auth';
import {  getFirestore, collection,  } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
// import { getAuth } from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBwmJOqV-h0s-Mjudko__1serBCfUtNp0M",
  authDomain: "blip-86cca.firebaseapp.com",
  databaseURL: "https://blip-86cca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blip-86cca",
  storageBucket: "blip-86cca.appspot.com",
  messagingSenderId: "284787654014",
  appId: "1:284787654014:web:5ff29d435fb910f90a872f",
  measurementId: "G-38EBYKH2Z8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

const auth = getAuth();
export { app, auth, db, database,  };

export const userRef = collection(db, 'users')