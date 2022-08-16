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
  setDoc,
  query,
  where,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { app } from './firebaseConfig.js';

const dataBase = getFirestore(app);

export const userInfo = (email, uid, name) => addDoc(collection(dataBase, 'usuarios'), {
  email,
  uid,
  name,
});

export const userInfoFirestore = (email, uid, name) => setDoc(doc(dataBase, 'usuarios', uid), {
  email,
  uid,
  name,
});

// dejar la función sin responsabilidad más que para firestore
export const getPosts = () => getDocs(collection(dataBase, 'post'));

export const getPost = (id) => getDoc(doc(dataBase, 'post', id));

export const createPost = (post) => addDoc(collection(dataBase, 'post'), post);

export const onGetPosts = async (callback) => {
  await onSnapshot(collection(dataBase, 'post'), (callback));
};

export const deletePost = (id) => deleteDoc(doc(dataBase, 'post', id));

export const updatePost = (id, post) => updateDoc(doc(dataBase, 'post', id), post);

// export const getUser = (id) => query(collection(dataBase, 'usuarios'), where('uid', '==', id));
export const getUser = (id) => getDoc(doc(dataBase, 'usuarios', id));
