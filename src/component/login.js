/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
import { navigation } from '../main.js';
import {
  signEmail,
  // onAuthStateChanged,
  database,
  ref,
  update,
  signGoogle,
  signFacebook,
  userCollection,
} from '../firebase/firebase.js';

export const login = () => {
  const viewLogin = `
<div class="windowlogin">
    <div class="messageDiv"></div>
    <form id='formLogin' class="formviewlogin">
        <div class="logoLogin">
          <img class="imgLogo" src="img/logo.JPG" alt="logo">
          <p class="nameLogo">TRAVELLERS</p>
        </div>
        <div class="loginImputDiv">
          <input  id="loginEmail"  class="inputs" type="text" placeholder="Escribe tu Email">
          <input  id="loginPasword"  class="inputs" type="password" placeholder="Escribe tu contraseña" required>
        </div>
        <div id='btnLoginDiv' class="btnLoginDiv">
          <button id="buttonLogin" class="buttonStyle">Ingresar</button>
          <p class="lineLogin">ingresar con</p>
          <div class="googleFacebook">
            <button id='btnGoogle' class="imgGoogle"><img class="imgGoogle" src="img/google.png" alt="google"></button>
            <button id='btnFacebook' class="imgFacebook"><img class="imgFacebook" src="img/facebook.png" alt="facebook"></button>
           </div>
          <div class="loginQuestionDiv">
            <p class="questionAboutCount">¿No tengo cuenta?</p>
          </div>
          <button id="btnToRegister" class="buttonStyle">Crear Cuenta</button>
        </div>
    </form>
  </div>
  `;

  const containerViewlogin = document.createElement('div');
  containerViewlogin.innerHTML = viewLogin;

  const formLogin = containerViewlogin.querySelector('#formLogin');
  const loginEmail = containerViewlogin.querySelector('#loginEmail');
  const loginPasword = containerViewlogin.querySelector('#loginPasword');
  const buttonLogin = containerViewlogin.querySelector('#buttonLogin');
  const btnGoogle = containerViewlogin.querySelector('#btnGoogle');
  const btnFacebook = containerViewlogin.querySelector('#btnFacebook');
  const btnToRegister = containerViewlogin.querySelector('#btnToRegister');
  const messageDiv = containerViewlogin.querySelector('.messageDiv');

  btnToRegister.addEventListener('click', () => navigation('/register'));

  // Ingreso con Email------------------------------------
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPasword.value;
    if (email !== '' && password !== '') {
      signEmail(email, password)
        .then((userCredential) => {
          formLogin.reset(userCredential);

          const dt = new Date();
          const user = userCredential.user;

          update(ref(database, `user/${user.uid}`), {
            last_Login: dt,
          });

          navigation('/muro');
        });
    } else {
      messageDiv.textContent = 'Por favor ingresa tu email y password';
    }
  });

  // Ingreso con google-------------------------------------

  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    signGoogle()
      .then((result) => {
        const user = result.user;
        navigation('/muro');
        userCollection(user.uid, user.displayName, user.photoURL);
      });
    // .catch(() => {
    //   messageDiv.textContent = 'Usuario no Registrado';
    // });
  });

  // Ingreso con facebook-------------------------------------

  btnFacebook.addEventListener('click', (e) => {
    e.preventDefault();

    signFacebook()
      .then((result) => {
        const user = result.user;
        navigation('/muro');
        userCollection(user.uid, user.displayName, user.photoURL);
      });
    // .catch(() => {
    //   messageDiv.textContent = 'Usuario no Registrado';
    // });
  });

  // observador------------------
  // const user = auth.currentUser;
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // ...
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  return containerViewlogin;
};
