import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { app } from './firebaseConfig.js';

const dataBase = getFirestore(app);

export const userInfo = async (email, uid, name) => {
  const docRef = await addDoc(collection(dataBase, 'usuarios'), {
    email,
    uid,
    name,
  });
  return docRef;
};

// dejar la función sin responsabilidad más que para firestore
export const getPosts = () => getDocs(collection(dataBase, 'post'));

export const getPost = (id) => getDoc(doc(dataBase, 'post', id));

export const createPost = (post) => addDoc(collection(dataBase, 'post'), post);

export const onGetPosts = async (callback) => {
  await onSnapshot(collection(dataBase, 'post'), (callback));
};

export const deletePost = (id) => deleteDoc(doc(dataBase, 'post', id));

export const updatePost = (id, post) => updateDoc(doc(dataBase, 'post', id), post);
