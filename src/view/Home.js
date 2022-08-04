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




