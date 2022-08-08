export default ()=> {
    const viewHome = `
    <h2>LaberintoLector</h2>
    <div class=button>
    <button class="button-register" id="optionregister">
        Registrarse
    </button>
    <button class="button-acces" id="optionacces">
        Acceder
    </button>
    </div>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewHome;

    return divElement;
}

export const homeFunctions = () => {
    const btnRegister = document.getElementById('optionregister')
    const btnAcces = document.getElementById('optionacces')

    btnRegister.addEventListener('click', (e) => {
        console.log('hola ingresaste al registro')
        window.location.hash ="#/Register"
    })

    btnAcces.addEventListener('click', (e) => {
        console.log('hola ingresaste al acceso')
        window.location.hash ="#/Acces"
    })

}


