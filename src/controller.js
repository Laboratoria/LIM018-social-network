import { components } from './views/components.js';

const changeView = (route) => {
  const container = document.getElementById('forms');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/log-in': { container.appendChild(components.loginView());
      components.logInBehavior();
      break;
    }
    case '#/sign-up': { container.appendChild(components.SignUpView());
      components.SignUpBehavior();
      break;
    }
    default: return null;
  }
};

export { changeView };
