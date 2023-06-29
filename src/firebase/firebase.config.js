// Import the functions you need from the SDKs you need

import { getApps, getApp, initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBFyEHcYhJrNwtDpbKNr2Z7-OCElXefb0",
  authDomain: "food-donation-13ce7.firebaseapp.com",
  projectId: "food-donation-13ce7",
  storageBucket: "food-donation-13ce7.appspot.com",
  messagingSenderId: "447966582861",
  appId: "1:447966582861:web:906897fbc7176fc22aa404"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

const app = getApps.length > 0 ? getApp(app) : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };