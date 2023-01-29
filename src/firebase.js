import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgGYNtBK2d562kHbPXWLCjrx23E-IdqfE",
    authDomain: "cryptogram-cad7f.firebaseapp.com",
    projectId: "cryptogram-cad7f",
    storageBucket: "cryptogram-cad7f.appspot.com",
    messagingSenderId: "661514738781",
    appId: "1:661514738781:web:eeedde6d289c47604a41b4"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.EmailAuthProvider();

  export {auth, provider};
  export default db;