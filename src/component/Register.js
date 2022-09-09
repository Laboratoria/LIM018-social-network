/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
import { navigation } from '../main.js';
import {
  database, registerUser, set, ref,
  // registerUser,
  userCollection,
} from '../firebase/firebase.js';

export const register = () => {
  const viewRegister = `
<div class="windowRegister">
<form class="formRegister">
     <div class="messageDiv" ></div>
     <div class="welcomeRegister">Regístrate en esta nueva aventura viajero!</div>
     <div  class="registerDateDiv">
        <input type="text" id="registerName" class ="inputs" placeholder="Escribe tu nombre">
        <input type="text" id="registerLastName" class ="inputs" placeholder="Escribe tus apellidos">
        <input type="email" id="registerEmail" class ="inputs" placeholder="Escribe tu Email">
        <input type="password" id="registerPasword" class ="inputs" placeholder="Escribe tu contraseña">
     </div>
     <div class="btnsRegisterDiv">
       <button id="buttonRegister" class="buttonStyle">Registarse</button>
       <button id="buttonBackToLogin" class="buttonStyle">Iniciar sesion</button>
     </div>

   </form>
</div>
`;

  const containerViewRegister = document.createElement('div');
  containerViewRegister.innerHTML = viewRegister;

  const formRegister = containerViewRegister.querySelector('.formRegister');
  const buttonRegister = containerViewRegister.querySelector('#buttonRegister');
  const buttonBackToLogin = containerViewRegister.querySelector('#buttonBackToLogin');
  const registerName = containerViewRegister.querySelector('#registerName');
  const registerLastName = containerViewRegister.querySelector('#registerLastName');
  const registerEmail = containerViewRegister.querySelector('#registerEmail');
  const registerPasword = containerViewRegister.querySelector('#registerPasword');

  buttonBackToLogin.addEventListener('click', () => navigation('/'));

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();

    if (registerEmail.value !== '' && registerPasword.value !== '' && registerName.value !== '' && registerLastName.value !== '') {
      const username = registerName.value;
      const email = registerEmail.value;
      const password = registerPasword.value;
      const messageDiv = containerViewRegister.querySelector('.messageDiv');

      registerUser(email, password)
        .then((userCredential) => {
          messageDiv.textContent = 'Usuario creado';
          formRegister.reset();
          const user = userCredential.user;

          set(ref(database, `user/${user.uid}`), { // Envia a Realtime los campos indicados
            username,
            email,
          });

          userCollection(user.uid, username, user.photoURL);
        });
    } else {
      const messageDiv = containerViewRegister.querySelector('.messageDiv');
      messageDiv.textContent = 'Por favor ingresar los datos solicitados';
    }
  });

  return containerViewRegister;
};
