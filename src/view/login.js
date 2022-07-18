import {
  authGoogle, logInWithEmailAndPass,
} from '../firebase/auth.js';

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewLogin = `<div class="cont-title">
  <h1 class="title">TWITCHTTER</h1>  
  <div class="cont-logo">
  <img src="./img/mando.png" class="logo hidden" alt="logoTwitchtter">
  </div>
  <h2 class="slogan hidden main-slogan">¡La red social creada por gamers para gamers!</h2>
  </div>
  <div class="cont-form">
  <form class="form-login">
  <h2 class="slogan slogan-desktop">¡Bienvenido gamer!</h2>
  <div class="cont-inputs-login">
    <input class="input-login" id="user-email" type="text" placeholder="Correo de usuario">
    <input class="input-login" id="user-password"  type="password" placeholder="Contraseña">
    <a class="links-redirect" href="#">¿Olvidaste tu contraseña?</a>
  </div>
    <button type="button" class="btn-enter btn-general">Entrar</button>
    <p id="message-error"></p>
  <div class="separator">
    <hr class="hr">O<hr class="hr">
  </div>
  <button type="button" class="btn-google btn-general"><img class="google-icon" src="./img/googleicon.png" alt="google icon"> Iniciar sesión con google</button>
  <div class="links-redirect">¿No eres miembro? <a class="links-redirect" href="#/register">Regístrate ahora</a></div>
  </form>
  </div>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'screen-login');
  section.innerHTML = viewLogin;

  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const msgError = section.querySelector('#message-error');
  const email = section.querySelector('#user-email');
  const password = section.querySelector('#user-password');
  const btnGoogle = section.querySelector('.btn-google');
  const btnEnter = section.querySelector('.btn-enter');

  // EVENTO CLICK DEL BOTON ENTRAR
  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value !== '' && password.value !== '') {
      msgError.innerHTML = '';
      // PROMESA DEL LOGIN PARA VALIDACION DE CREDENCIALES
      logInWithEmailAndPass(email.value, password.value).then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          msgError.innerText = '';
          window.location.hash = '#/home';
        } else {
          msgError.innerText = 'El usuario no se encuentra verificado';
        }
      })
        .catch((error) => {
          const errorMessage = error.message;
          // CONTROL DE ERRORES PARA MOSTRAR EN EL DOM
          switch (errorMessage) {
            case 'Firebase: Error (auth/user-not-found).': {
              msgError.innerHTML = 'Usuario no encontrado';
              break;
            }
            case 'Firebase: Error (auth/wrong-password).': {
              msgError.innerHTML = 'Contraseña incorrecta';
              break;
            }
            case 'Firebase: Error (auth/invalid-email).': {
              msgError.innerHTML = 'Email Inválido';
              break;
            }
            default: msgError.innerHTML = '';
              break;
          }
          console.log(errorMessage);
        });
    } else {
      msgError.innerHTML = 'Debes completar todos los campos para continuar';
    }
  });

  // INICIO DE SESION CON GOOGLE
  btnGoogle.addEventListener('click', authGoogle);

  return section; // RETORNA EL NODO DE LA SECCION DE LOGUEO
};
