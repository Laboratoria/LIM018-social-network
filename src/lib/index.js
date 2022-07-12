// aqui exportaras las funciones que necesites
import { signUpWithEmail } from '../firebase/firebaseConfig.js';

export const myFunction = () => {
  // aqui tu codigo
  // eslint-disable-next-line no-console
  console.log('Hola mundo!');
};

export const signUp = () => {
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('userPassword').value;
  // eslint-disable-next-line no-console
  console.log(userEmail, userPassword);
  signUpWithEmail(userEmail, userPassword)
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log(result);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};
