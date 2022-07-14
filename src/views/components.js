import { createLoginView, createBehaviorLoginView } from './log-in-view.js';
import { createSignUpView, createBehaviorSignUpView } from './sign-up-view.js';

const components = {
  SignUpView: createSignUpView,
  SignUpBehavior: createBehaviorSignUpView,
  loginView: createLoginView,
  logInBehavior: createBehaviorLoginView
};
// eslint-disable-next-line no-console
console.log(components);
export { components };
