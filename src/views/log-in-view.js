import { enterWithEmail } from '../lib/index.js';
// eslint-disable-next-line import/no-cycle
import { changeView } from '../controller.js';

export const createLoginView = () => {
  const viewLogin = `
  <div class="containerForm">
    <div class="view">
      <h1 class="titles"> THE SOCIAL FOOD </h1>
      <form>
        <input type="email" placeholder="Email" id="userEmail" class="emailPassword" value="" class='emailPassword'>
        <br>
        <input type="password" placeholder="Contraseña" id="password" class="emailPassword" value="" class='emailPassword'>
        <br>
        <button type="button" id="submitLogIn" class="buttonsForm" >Log In</button>
      </form>
        <p>o</p>
        <button type="button" id="gmailLogIn" class="gmail"><a href='#/home'><img src="./images/google-logo-png.png" class='googleImage'></a></button>
        <h3>Si no tienes cuenta, crea una <span><a href="#/sign-up">  aquí</a></span></h3>
    </div>
  </div>  `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'backgroundImage');
  divElement.innerHTML = viewLogin;

  return divElement;
};

export const createBehaviorLoginView = () => {
  const userEmail = document.querySelector('#userEmail');
  const userPassword = document.querySelector('#password');
  const submitButton = document.querySelector('#submitLogIn');

  submitButton.addEventListener('click', (e) => {
    enterWithEmail(userEmail.value, userPassword.value).then((result) => {
      const userCredential = result.user;
      if (userCredential.emailVerified === false) {
        console.log(e.target);
        console.log('email no verificado');
      } else {
        alert(`Has ingresado correctamente la cuenta con el correo electrónico ${userCredential.email}. Usarás esta dirección de correo para iniciar sesión`);
        window.location.href = '#/home';
        // changeView('#/home');
      }
      // si userCredential.emailVerified es false no dejar hacer login
      // eslint-disable-next-line no-console
    })
      .catch((error) => {
      // Debe imprimir el mensaje de error en el html
        const errorM = error.message;
        alert(errorM);
      });
  });
};
