import { components } from '../views/components.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/log-in':
    { return container.appendChild(components.LogIn()); }
    case '#/sign-up':
    { return container.appendChild(components.SignUp()); }
    default: return 'hola';
  }
};
export { changeView };
