// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBmZSt848tfK4Njjp1PovGDrjlfOBRNZHk',
  authDomain: 'thesocialfoodapp.firebaseapp.com',
  projectId: 'thesocialfoodapp',
  storageBucket: 'thesocialfoodapp.appspot.com',
  messagingSenderId: '705768273947',
  appId: '1:705768273947:web:310fb8bbdb0bc7ffc1e0be',
};

export const app = initializeApp(firebaseConfig);
