import { components } from './views/components.js';

const changeView = (route) => {
  const container = document.getElementById('forms');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/sign-up': { container.appendChild(components.signUpView());
      components.signUpBehavior();
      break;
    }
    case '#/log-in': { container.appendChild(components.loginView());
      components.logInBehavior();
      break;
    }
    case '#/home': { container.appendChild(components.homeView());
      components.homeBehavior();
      break;
    }
    default: return null;
  }
};

export { changeView };
