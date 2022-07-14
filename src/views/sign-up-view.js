import { registerWithEmail } from '../lib/index.js';

export const createSignUpView = () => {
  const viewSignup = `
  <div class="containerForm">
    <h1 class="titles"> THE SOCIAL FOOD </h1>
      <form>
        <input type="text" placeholder="Nombre y Apellidos" id="userName">
        <br>
        <input type="email" placeholder="Correo electrónico" id="email">
        <br>
        <input type="password" placeholder="Contraseña" id="userPassword" value="">
        <br>
        <button type="button" id="submitSingUp" class="buttonsForm" value="Sign Up">Sign Up</button>
      </form>
      <h3>¿Tienes cuenta?<span><a href="#/log-in">Entrar</a></span></h3>
  </div>`;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'backgroundImage');
  divElement.innerHTML = viewSignup;

  return divElement;
};

export const createBehaviorSignUpView = () => {
  const userEmail = document.querySelector('#email');
  const userPassword = document.querySelector('#userPassword');

  const submitButton = document.querySelector('#submitSingUp');
  console.log(userEmail.value, userPassword.value);
  submitButton.addEventListener('click', () => registerWithEmail(userEmail.value, userPassword.value));
};
