import {createUser} from '../lib/index.js'

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
    </button>`

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
        console.log(user, password)
        createUser(user, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.hash ="#/Acces"
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code, error.message)
            // ..
          });
        
    })

}

