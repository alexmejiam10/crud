import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1-l4hEomSN4teeAA4c_YhwcIcKNJKCgg",
    authDomain: "crud-ca7a2.firebaseapp.com",
    projectId: "crud-ca7a2",
    storageBucket: "crud-ca7a2.appspot.com",
    messagingSenderId: "465274287153",
    appId: "1:465274287153:web:b5007af37023265686d110"
  }
 export const firebaseApp =firebase.initializeApp(firebaseConfig)