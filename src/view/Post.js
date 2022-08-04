export default ()=> {
    const viewDifferent = `
    <h2>Crea tu post</h2>
    <input type="text">
    `
    
    const divElement = document.createElement('div')
    divElement.setAttribute('id','message');
    divElement.innerHTML = viewDifferent;
    return divElement;
}