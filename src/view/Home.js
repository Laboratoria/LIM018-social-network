export default ()=> {
    const viewHome = `
    <h2>LaberintoLector</h2>
    <button class="button" id="optionregister">
        Registrarse
    </button>
    <button class="button" id="optionacces">
        Acceder
    </button>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewHome;

    return divElement;
}


