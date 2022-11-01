import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7GdTwStkoqm1f1oElMpjdwlTI-xJa6gE",
  authDomain: "food-delivery-app-9e4a5.firebaseapp.com",
  databaseURL: "https://food-delivery-app-9e4a5-default-rtdb.firebaseio.com",
  projectId: "food-delivery-app-9e4a5",
  storageBucket: "food-delivery-app-9e4a5.appspot.com",
  messagingSenderId: "53312896565",
  appId: "1:53312896565:web:0f8d178d7f25b456907b7c",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, fireStore, storage };
