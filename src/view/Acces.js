export default ()=> {
    const viewAcces = `
    <h2>Bienvenido</h2>
    <label>Email</label>
    <input type="text">
    <label>Contraseña</label>
    <input type="text">
    <button class="button" id="acces">
        Acceder
    </button>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewAcces;

    return divElement;
}