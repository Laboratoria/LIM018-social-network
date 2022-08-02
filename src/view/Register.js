export default ()=> {
    const viewRegister = `
    <h2>Crear nueva cuenta</h2>
    <label>Nombre</label>
    <input type="text">
    <label>Email</label>
    <input type="text">
    <label>Contraseña</label>
    <input type="text">
    <button class="button-register" id="register">
        Registrarse
    </button>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewRegister;

    return divElement;
}