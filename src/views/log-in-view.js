import { enterWithEmail } from '../lib/index.js';
// eslint-disable-next-line import/no-cycle

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
      <div id='eMessage'></div>
        <p>o</p>
        <img src="./images/google-logo.png" id="gmailLogIn" class='googleImage'>
        <p>Con Google</p>
        <h3>Si no tienes cuenta, crea una <span><a href="#/sign-up">  aquí</a></span></h3>
    </div>
    <div class='modalContainer'>
      <div class='modal'>
        <img src='./images/email-alert-icon.png'>
        <p>Cuenta no verificada, porfavor revise su bandeja de correo electrónico</p>
        <button class='modalButton'>Aceptar</button>
      </div>
    </div>    
  </div>  `;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'backgroundImage');
  divElement.innerHTML = viewLogin;
  const printInBody = document.querySelector('body');
  printInBody.appendChild(divElement);
};

export const createBehaviorLoginView = () => {
  const userEmail = document.querySelector('#userEmail');
  const userPassword = document.querySelector('#password');
  const submitButton = document.querySelector('#submitLogIn');
  const eMessage = document.querySelector('#eMessage');
  const modalContainer = document.querySelector('.modalContainer');
  const closeModal = document.querySelector('.modalButton');

  submitButton.addEventListener('click', () => {
    enterWithEmail(userEmail.value, userPassword.value).then((result) => {
      const userCredential = result.user;
      if (userCredential.emailVerified === false) {
        modalContainer.classList.add('reveilModal');
      } else {
        window.location.href = '#/home';
      }
    })
      .catch((error) => {
      // Debe imprimir el mensaje de error en el html
        const errorM = error.message;
        eMessage.setAttribute('class', 'errorMessage');
        console.log(errorM);
        switch (errorM) {
          case 'Firebase: Error (auth/invalid-email).': {
            eMessage.textContent = 'Debe ingresar un correo electrónico válido';
            break;
          }
          case 'Firebase: Error (auth/wrong-password).': {
            eMessage.textContent = 'Ingresar contraseña válida';
            break;
          }
          default:
            errorM.textContent = '';
            break;
        }
      });
  });

  closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('reveilModal');
  });
};
