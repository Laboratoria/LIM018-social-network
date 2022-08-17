// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller.js';
import { stateOfTheUser, auth } from './firebase/auth.js';

const insertWindowView = () => window.addEventListener('hashchange', () => changeView(window.location.hash));
window.addEventListener('load', insertWindowView);

changeView(window.location.hash);

stateOfTheUser(auth, (user) => {
  if (user !== null && user.emailVerified) {
    window.location.href = '#/home';
  }
});
