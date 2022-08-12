import {createUser, sendEmail} from '../lib/index.js'

export default () => {
    const viewRegister = `
    <h2>Crear nueva cuenta</h2>
    <label>Nombre</label>
    <input type="text" id="name">
    <label>Email</label>
    <input type="text" id="email">
    <label>Contraseña</label>
    <input type="text" id="password">
    <button class="button-register" id="register">
        Registrarse
    </button>
    <p id="message-error"></p>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewRegister;

    return divElement;
}



export const registerFunctions = () => {
    const btnRegister = document.getElementById('register')
    btnRegister.addEventListener('click', (e) => {
        console.log('hola registrandose')
        const user = document.getElementById('email').value
        const password = document.getElementById('password').value
        const msgError = document.getElementById('message-error')
        if (user !== '' && password !== ''){
          createUser(user, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(userCredential)
            sendEmail().then((data)=>{
              console.log(data)
              alert("se envio correo")
            }).catch((error) => {
              console.log(error)
            })
            // window.location.hash ="#/Post"
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code, error.message)
            // ..
          });

        }else{
          msgError.innerHTML ="ingresa email o password faltante"
        }  
    })
}

