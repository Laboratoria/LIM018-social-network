import { logInWithEmail, signUpWithGmail, GoogleAuthProvider } from '../firebase/auth.js';
import { userInfoFirestore } from '../firebase/post.js';

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
  const gmailButton = document.querySelector('#gmailLogIn');

  submitButton.addEventListener('click', () => {
    logInWithEmail(userEmail.value, userPassword.value).then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified === false) {
        modalContainer.classList.add('reveilModal');
      } else {
        sessionStorage.setItem('USER', JSON.stringify(user.uid));
        window.location.href = '#/home';
      }
    })
      .catch((error) => {
      // Debe imprimir el mensaje de error en el html
        const errorM = error.message;
        eMessage.setAttribute('class', 'errorMessage');
        switch (errorM) {
          case 'Firebase: Error (auth/invalid-email).': {
            eMessage.textContent = 'Debe ingresar un correo electrónico válido';
            break;
          }
          case 'Firebase: Error (auth/wrong-password).': {
            eMessage.textContent = 'Ingresar contraseña válida';
            break;
          }
          case 'Firebase: Error (auth/user-not-found).': {
            eMessage.textContent = 'El correo no se encuentra registrado, porfavor créese una cuenta';
            break;
          }
          default:
            eMessage.textContent = '';
            break;
        }
      });
  });

  closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('reveilModal');
  });

  gmailButton.addEventListener('click', () => {
    signUpWithGmail().then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      sessionStorage.clear();
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      sessionStorage.setItem('USER', JSON.stringify(user.uid));
      console.log(user);
      userInfoFirestore(user.uid, {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
      // redireccionar y ruteo
      window.location.href = '#/home';
    }).catch((error) => {
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // eslint-disable-next-line no-console
      console.log(errorMessage, email);
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  });
};

// sessionStorage.setItem('USER', JSON.stringify(user.uid));
// let userObject = sessionStorage.getItem('USER');
//   userObject = JSON.parse(sessionStorage.USER);
