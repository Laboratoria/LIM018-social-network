/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import {
  getFirestore, setDoc, doc, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { app } from './conection.js';

const db = getFirestore(app);
export const auth = getAuth();
export const stateUser = onAuthStateChanged;
const provider = new GoogleAuthProvider();

export const registerUser = (email, name, nickname, uid) => {
  setDoc(doc(db, 'users', uid), {
    email,
    name,
    nickname,
    uid,
  });
  /*  .then((docRef) => {
      console.log('usuario logueado', docRef);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    }); */
};

export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // currentUser();
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      console.log(user.uid);
      registerUser(user.email, user.displayName, user.displayName, user.uid);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const registerUserWithEmailAndPassword = (email, name, nickname, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      registerUser(email, name, nickname, user.uid);
      // ...
      sendEmailVerification(auth.currentUser)
        .then(() => {
        // Email verification sent!
          console.log('correo enviado');
        // ...
        });
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, error.code);
      // ..
    });
};

export const logInWithEmailAndPass = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

export const createPost = (uid, post, datePost, state) => {
  addDoc(collection(db, 'post'), {
    uid,
    post,
    datePost,
    state,
  })
    .then((docRef) => {
      console.log('post creado', docRef);
    });
  /* .catch((error) => {
      console.error('Error adding document: ', error);
    });  */
};

/* funcion para obtener informacion de los post */
export const getPost = () => {
  getDocs(collection(db, 'post'))
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((elementPost) => {
        console.log(`${elementPost.id} => ${elementPost.data().datePost}`);
      });
    });
};

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    // currentUser();
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
