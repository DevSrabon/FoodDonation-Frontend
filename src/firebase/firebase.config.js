// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";
import "firebase/compat/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5azHRt8vDkrYclsFD8HQuBzoCN_Ov9MU",
  authDomain: "food-donation-new-9fa4a.firebaseapp.com",
  projectId: "food-donation-new-9fa4a",
  storageBucket: "food-donation-new-9fa4a.appspot.com",
  messagingSenderId: "23464134108",
  appId: "1:23464134108:web:01fbc81112453346333b19",
  measurementId: "G-1HY7TNGKRN",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const fbApp = getApp();
const fbStorage = getStorage();

const listFiles = async () => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};

/**
 *
 * @param {*} uri
 * @param {*} name
 */
const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export { fbApp as app, fbStorage, listFiles, uploadToFirebase };
