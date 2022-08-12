import { signIn } from '../lib/index.js'

export default () => {
  const viewAcces = `
    <h2>Bienvenido</h2>
    <label>Email</label>
    <input type="text" id="email">
    <label>Contraseña</label>
    <input type="text" id="password">
    <button class="button-acces" id="acces">
        Acceder
    </button>
    <p id="message-error"></p>`

  const divElement = document.createElement('div')
  divElement.innerHTML = viewAcces;

  return divElement;
}

export const accesFunctions = () => {
  const btnAcces = document.getElementById('acces')
  btnAcces.addEventListener('click', (e) => {
    const user = document.getElementById('email').value
    const password = document.getElementById('password').value
    const msgError = document.getElementById('message-error')
    if (user !== '' && password !== ''){
      signIn(user, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential)
        // window.location.hash = "#/Post"
        if(user.emailVerified){
          console.log('verificado')
          window.location.hash = "#/Post"
        }else{
          console.log('no se verificó')
        }
      })
      .catch((error) => {
        console.log("error")
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }else{
      console.log('ingresa email o password faltante')
      msgError.innerHTML ="ingresa email o password faltante"
    }
  })
}

