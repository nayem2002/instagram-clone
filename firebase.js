import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCq7L2-YxTtS2Qq8RkVJ0vTYy77HCw1ndM',
  authDomain: 'insta-clone-d6e1b.firebaseapp.com',
  projectId: 'insta-clone-d6e1b',
  storageBucket: 'insta-clone-d6e1b.appspot.com',
  messagingSenderId: '781754639567',
  appId: '1:781754639567:web:266c8894e5b9dca5a543ba',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
