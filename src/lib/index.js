// aqui exportaras las funciones que necesites
import { signUpWithEmail, logInWithEmail } from '../firebase/firebaseConfig.js';
// , addCollection
export const registerWithEmail = (email, password) => {
  // eslint-disable-next-line no-console
  console.log(email, password);
  return signUpWithEmail(email, password);
};

export const enterWithEmail = (email, password) => {
  console.log(email, password);
  return logInWithEmail(email, password);
};
