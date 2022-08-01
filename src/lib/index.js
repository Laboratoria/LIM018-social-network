// aqui exportaras las funciones que necesites

//export const myFunction = () => {
  // aqui tu codigo
  //console.log('Hola mundo!');
//};

import {components} from '../view/index.js'

const changeView = (route)=> {
  const container = document.getElementById('container')
  container.innerHTML = '';
  switch (route){
    case '#/':
      { return container.appendChild(components.home())}
    case '#/Register':
      { return container.appendChild(components.register())}
    case '#/Acces':
      { return container.appendChild(components.acces())}
  }
  console.log(route)
}

export {changeView}