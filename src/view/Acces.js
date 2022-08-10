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
    </button>`

  const divElement = document.createElement('div')
  divElement.innerHTML = viewAcces;

  return divElement;
}

export const accesFunctions1 = () => {
  const btnAcces = document.getElementById('acces')
  btnAcces.addEventListener('click', (e) => {
    console.log('hola accediendo')
    const user = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(user, password)


  })

}


export const accesFunctions2 = () => {
  signIn(user, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.hash = "#/Post"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.code, error.message)
      // ..
    });
}