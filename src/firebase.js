import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyACSPF0hjYFRWPWMf9mSjvjon1r3W5mTQA",
    authDomain: "imessage-clone-57c6c.firebaseapp.com",
    projectId: "imessage-clone-57c6c",
    storageBucket: "imessage-clone-57c6c.appspot.com",
    messagingSenderId: "183458772878",
    appId: "1:183458772878:web:c511cea81fcf3983c656df",
    measurementId: "G-NEMSPFTEX3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider(); 

  export {auth, provider};
  export default db; 