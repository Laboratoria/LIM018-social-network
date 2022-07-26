// eslint-disable-next-line import/no-unresolved
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { registerWithEmail } from '../lib/index.js';
import { dataBase, signUpWithGmail, emailVerification } from '../firebase/firebaseConfig.js';

export const createSignUpView = () => {
  const viewSignup = `
  <div class='containerForm'>
    <div class='view'>
      <h1 class='titles'> THE SOCIAL FOOD </h1>
        <form>
          <input type='text' placeholder='Nombre de Usuario' id='userName' class="registerInputs">
          <br>
          <input type='email' placeholder='Correo electrónico' id='email' class="registerInputs">
          <br>
          <input type='password' placeholder='Contraseña' id='userPassword' value='' class="registerInputs">
          <br>
          <button type='button' id='submitSingUp' class='buttonsForm' value='Sign Up'>Sign Up</button>
        </form>
        <div id='eMessage'></div>
        <button type="button" id="gmailSignIn" class="gmail"><img src="./images/google-logo-png.png" class='googleImage'></button>
        <h3>¿Tienes cuenta?<span><a href='#/log-in'>  Entrar</a></span></h3>
    </div>    
  </div>`;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'backgroundImage');
  divElement.innerHTML = viewSignup;

  return divElement;
};

export const createBehaviorSignUpView = () => {
  const userName = document.querySelector('#userName');
  const userEmail = document.querySelector('#email');
  const userPassword = document.querySelector('#userPassword');
  const eMessage = document.querySelector('#eMessage');
  const submitButton = document.querySelector('#submitSingUp');
  const gmailButton = document.querySelector('#gmailSignIn');
  // crear mas campos y traerlos (opcionale)

  submitButton.addEventListener('click', () => {
    registerWithEmail(userEmail.value, userPassword.value)
      .then(async (result) => {
        emailVerification().then(() => {
          alert('Se envió un email de verificación de cuenta');
          window.location.href = '#/log-in';
        });

        const userCredential = result.user;

        alert(`Registro exitoso con el correo ${userCredential.email}`);

        try {
          // pasarle al objeto todos los campos que le estamos pidiendo (opcional)
          const docRef = await addDoc(collection(dataBase, 'usuarios'), {
            email: userCredential.email,
            uid: userCredential.uid,
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }).catch((error) => {
        const errorM = error.message;
        eMessage.setAttribute('class', 'errorMessage');
        console.log(errorM);
        switch (errorM) {
          case 'Firebase: Error (auth/invalid-email).': {
            eMessage.textContent = 'Debe ingresar un correo electrónico válido';
            break;
          }
          case 'Firebase: Password should be at least 6 characters (auth/weak-password).': {
            eMessage.textContent = 'La contraseña debe tener como mínimo 6 caracteres';
            break;
          }
          case 'Firebase: Error (auth/email-already-in-use).': {
            eMessage.textContent = 'El correo electrónico ya está siendo usado';
            break;
          }
          default: errorM.textContent = '';
            break;
        }
      });
  });

  gmailButton.addEventListener('click', () => {
    signUpWithGmail().then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      const user = result.user;
      // eslint-disable-next-line no-console
      console.log(user);
      // redireccionar y ruteo
      window.location.href = '#/log-in';
    }).catch((error) => {
      const errorCode = error.code;
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
