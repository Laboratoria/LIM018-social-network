import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { app } from './firebaseConfig.js';

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
// eslint-disable-next-line max-len
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// eslint-disable-next-line max-len
export const logInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithGmail = () => signInWithPopup(auth, provider);

export const emailVerification = () => sendEmailVerification(auth.currentUser);
