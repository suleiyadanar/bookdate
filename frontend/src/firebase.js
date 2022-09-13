import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARkPVRs73L2alOmuA23FwSknWZs-At6DA",
    authDomain: "book-date-1249b.firebaseapp.com",
    projectId: "book-date-1249b",
    storageBucket: "book-date-1249b.appspot.com",
    messagingSenderId: "32820633141",
    appId: "1:32820633141:web:ec61146ff137d9c2781b7c",
    measurementId: "G-6070LVJ0SE"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.firestore();

  export default database;