/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { login } from './component/login.js';
import { muro } from './component/Muro.js';
import { register } from './component/Register.js';

const routes = {
  '/': login,
  '/register': register,
  '/muro': muro,
};

export const navigation = (pathname) => {
  // console.log('pasa por aca');

  const rootDiv = document.getElementById('root');
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
};

window.onload = () => {
  const rootDiv = document.getElementById('root');
  rootDiv.appendChild(routes[window.location.pathname]());
};

window.onpopstate = () => {
  const rootDiv = document.getElementById('root');
  rootDiv.appendChild(routes[window.location.pathname]());
};
