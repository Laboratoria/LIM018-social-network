import { enterWithEmail } from '../lib/index.js';

export const createLoginView = () =>
{
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
        <button type="button" id="gmailLogIn" class="gmail"><img src="./images/google-mas.png" class='googleImage'>  Log In with gmail</button>
        <h3>Si no tienes cuenta, crea una <span><a href="#/sign-up">aquí</a></span></h3>
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
  console.log(userEmail.value);
  submitButton.addEventListener('click', () => {
    enterWithEmail(userEmail.value, userPassword.value).then(async (result) => {
      const userCredential = await result.user;
      // eslint-disable-next-line no-console
      alert(`Has ingresado correctamente la cuenta con el correo electrónico ${userCredential.email}. Usarás esta dirección de correo para iniciar sesión`);
    })
      .catch((error) => {
      // Debe imprimir el mensaje de error en el html
        const errorM = error.message;
        alert(errorM);
      });
  });
};
