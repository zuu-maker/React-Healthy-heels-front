import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "healthy-heels-809aa.firebaseapp.com",
  projectId: "healthy-heels-809aa",
  storageBucket: "healthy-heels-809aa.appspot.com",
  messagingSenderId: "1068590615575",
  appId: "1:1068590615575:web:25c48efa74896c9e91e052",
  measurementId: "G-2TJ5YLBYFN",
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const auth = firebase.auth();
const storageBucket = firebase.storage();

export { db, auth, googleAuthProvider, storageBucket };
