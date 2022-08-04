export default ()=> {
    const viewDifferent = `
    <h2>404</h2>
    <h1>Página no encontrada</h1>
    <p>El archivo especificado no se enecuentra en este sitio web.
    Por favor, compruebe la URL para</p>
    `

    const divElement = document.createElement('div')
    divElement.setAttribute('id','message');
    divElement.innerHTML = viewDifferent;
    return divElement;
}