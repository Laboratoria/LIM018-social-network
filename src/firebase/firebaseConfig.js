/* eslint-disable max-len */
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import {
  getFirestore, getDocs, collection, addDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

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
const provider = new GoogleAuthProvider();
console.log(auth);
export const dataBase = getFirestore(app);
console.log(dataBase);

export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const logInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithGmail = () => signInWithPopup(auth, provider);

export const emailVerification = () => sendEmailVerification(auth.currentUser);

const postCollection = collection(dataBase, 'post');
export const getPosts = async () => {
  const snapshot = await getDocs(postCollection);
  const posts = [];
  snapshot.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));
  return posts;
};

export const createPost = (text) => addDoc(postCollection, { contenido: text });
