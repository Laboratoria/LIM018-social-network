// import { app } from './firebase/conection.js';
/* eslint-disable-next-line */
import { auth, stateUser } from './firebase/auth.js';
import { changeView } from './view-controller/route.js';

window.addEventListener('load', () => {
  changeView(window.location.hash);
});
window.addEventListener('hashchange', () => {
  changeView(window.location.hash);
});

stateUser(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const currUser = user.email;
    window.location.hash = '#/home';
    console.log('Usuario logueado', currUser);

    // ...
  } else {
    // User is signed out
    window.location.hash = '';
    console.log('No hay usuario logueado');
    // ...
  }
});
