
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


 const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyB1_60XTGDgrNGLhuSPZFvQcpVc9tdcE_4",
  authDomain: "intagram-64273.firebaseapp.com",
  databaseURL: "https://intagram-64273.firebaseio.com",
  projectId: "intagram-64273",
  storageBucket: "intagram-64273.appspot.com",
  messagingSenderId: "1049483033039",
  appId: "1:1049483033039:web:b60901ed960221ae737aba",
  measurementId: "G-YJE0CVTH24"
 });
 

   const db = firebaseApp.firestore();
   const auth = firebaseApp.auth()
  const storage = firebase.storage()
   export {storage,db, auth} ;