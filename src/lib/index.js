// aqui exportaras las funciones que necesites
import { signUpWithEmail, addCollection } from '../firebase/firebaseConfig.js';

export const registerWithEmail = (email, password) => {
  // eslint-disable-next-line no-console
  console.log(email, password);
  signUpWithEmail(email, password)
    .then((result) => {
      // Debe guardar o capturar las credenciales(correo y contraseña) del usuario
      // eslint-disable-next-line no-console
      console.log(result);
    })
    .catch((error) => {
      // Debe imprimir el mensaje de error en el html
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

export const addDataBaseElement = (dataObject) => {
  console.log(dataObject);
  addCollection(dataObject)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.log('Error adding document: ', error);
    });
};
