import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBo_jemhnZ90aVta2oOa86TSnYt7egRvro",
  authDomain: "instagram-clone-5bfc7.firebaseapp.com",
  projectId: "instagram-clone-5bfc7",
  storageBucket: "instagram-clone-5bfc7.appspot.com",
  messagingSenderId: "173518995752",
  appId: "1:173518995752:web:456c5d6ed8fa16800bd01d"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
