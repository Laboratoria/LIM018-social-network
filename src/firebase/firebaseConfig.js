// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJS0i6kxlNF9NLIYFT5DfOV79NOU4yy_I',
  authDomain: 'the-social-food-c3b76.firebaseapp.com',
  projectId: 'the-social-food-c3b76',
  storageBucket: 'the-social-food-c3b76.appspot.com',
  messagingSenderId: '209961845793',
  appId: '1:209961845793:web:e4ce423b50a5aab81fcf60',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const signUpWithEmail = (email, password) =>{
  return createUserWithEmailAndPassword(auth, email, password) };