import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { app } from './firebaseConfig.js';

const dataBase = getFirestore(app);

export const userInfo = async (email, uid) => {
  const docRef = await addDoc(collection(dataBase, 'usuarios'), {
    email,
    uid,
  });
  return docRef;
};

// dejar la función sin responsabilidad más que para firestore
export const getPosts = async () => {
  const snapshot = await getDocs(collection(dataBase, 'post'));
  return snapshot;
};

export const getPost = (id) => getDoc(doc(dataBase, 'post', id));

export const createPost = (content) => addDoc(collection(dataBase, 'post'), { content });
