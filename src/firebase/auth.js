import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  signOut,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { app } from './firebaseConfig.js';

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// eslint-disable-next-line max-len
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// eslint-disable-next-line max-len
export const logInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithGmail = () => signInWithPopup(auth, provider);

export const emailVerification = () => sendEmailVerification(auth.currentUser);

export const getCurrentUser = () => auth.currentUser;

// eslint-disable-next-line max-len
export const completeUserInfo = (userInformation) => updateProfile(auth.currentUser, userInformation);

export const logOut = () => {
  signOut(auth);
};

export { GoogleAuthProvider };
