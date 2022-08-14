export default ()=> {
    const viewDifferent = `
    <section class="contenido_container2" id="container2">
    <div class = "post">
    <h2>Crea tu post</h2>
    <input type="text">
    </div>
    </section>>
    `
    
    const divElement = document.createElement('div')
    divElement.setAttribute('id','message');
    divElement.innerHTML = viewDifferent;
    return divElement;
}