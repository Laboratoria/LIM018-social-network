// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyAJS0i6kxlNF9NLIYFT5DfOV79NOU4yy_I',
  authDomain: 'the-social-food-c3b76.firebaseapp.com',
  projectId: 'the-social-food-c3b76',
  storageBucket: 'the-social-food-c3b76.appspot.com',
  messagingSenderId: '209961845793',
  appId: '1:209961845793:web:e4ce423b50a5aab81fcf60',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
const dataBase = getFirestore(app);
console.log(dataBase);
// eslint-disable-next-line max-len
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
console.log(signUpWithEmail);

export const addCollection = (dataObject) => dataBase.collection('users')
  .addDoc(dataObject);
console.log(addCollection);
