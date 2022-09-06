import { createLoginView, createBehaviorLoginView } from './log-in-view.js';
import { createSignUpView, createBehaviorSignUpView } from './sign-up-view.js';
import { createHomeView, createBehaviorHomeView } from './home-view.js';
import { createErrorView } from './errorView.js';

const components = {
  signUpView: createSignUpView,
  signUpBehavior: createBehaviorSignUpView,
  loginView: createLoginView,
  logInBehavior: createBehaviorLoginView,
  homeView: createHomeView,
  homeBehavior: createBehaviorHomeView,
  errorView: createErrorView,
};

export { components };
