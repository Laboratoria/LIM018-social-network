import { components } from './views/components.js';

const changeView = (route) => {
  const container = document.getElementById('forms');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/sign-up': { container.appendChild(components.SignUpView());
      components.SignUpBehavior();
      break;
    }
    case '#/log-in': { container.appendChild(components.loginView());
      components.logInBehavior();
      break;
    }
    default: return null;
  }
};

export { changeView };
