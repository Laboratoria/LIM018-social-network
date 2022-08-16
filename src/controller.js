import { components } from './views/components.js';

export const changeView = (route) => {
  const containerBody = document.querySelector('body');
  containerBody.innerHTML = '';
  switch (route) {
    case '': {
      components.loginView();
      components.logInBehavior();
      break; }
    case '#/sign-up': { containerBody.appendChild(components.signUpView());
      components.signUpBehavior();
      break;
    }
    case '#/log-in': { components.loginView();
      components.logInBehavior();
      break;
    }
    case '#/home': { containerBody.appendChild(components.homeView());
      components.homeBehavior();
      break;
    }
    default: { containerBody.appendChild(components.errorView());
      break; }
  }
};
