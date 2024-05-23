// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';
import { FirebaseOptions } from 'firebase/app';
const firebaseConfig:FirebaseOptions = {

  authDomain: "testapp-6aeea.firebaseapp.com",
  databaseURL: "https://testapp-6aeea-default-rtdb.firebaseio.com",
  projectId: "testapp-6aeea",
  storageBucket: "testapp-6aeea.appspot.com",
  messagingSenderId: "999578104359",
  appId: "1:999578104359:web:496f606f11bd1c258fd402",
  measurementId: "G-ZVJJ4R5H82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

export { app, db, storage };
