export default () => {
    const viewRegister = `
    <h2>Crear nueva cuenta</h2>
    <label>Nombre</label>
    <input type="text">
    <label>Email</label>
    <input type="text" id="email">
    <label>Contraseña</label>
    <input type="text id="password">
    <button class="button-register" id="register">
        Registrarse
    </button>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewRegister;

    // const inputEmail = document.getElementById('email')
    // const inputPassword = document.getElementById('password')
    // const btnRegister = document.getElementById('register')

    // btnRegister.addEventListener('click',()=>{})


    return divElement;
}

export const registerFunctions = () => {
    const btnRegister = document.getElementById('register')

    btnRegister.addEventListener('click', (e) => {
        
    })


}

// const inputEmail = document.querySelectorAll('#email')
// const inputPassword = document.querySelector('#password')
// const btnRegister = document.querySelectorAll('#register')

// btnRegister.addEventListener('click',()=>{})

