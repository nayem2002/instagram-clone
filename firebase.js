import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCTLWH_zMucsIekDFjD8SAAoyNthLVl-fQ",
  authDomain: "instagram-clone-bf6f4.firebaseapp.com",
  projectId: "instagram-clone-bf6f4",
  storageBucket: "instagram-clone-bf6f4.appspot.com",
  messagingSenderId: "787680583116",
  appId: "1:787680583116:web:d0afec3ca8b222ae03d169"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
