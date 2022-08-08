// aqui exportaras las funciones que necesites

//export const myFunction = () => {
  // aqui tu codigo
  //console.log('Hola mundo!');
//};

import {components} from '../view/index.js'
import { registerFunctions} from '../view/Register.js'
import { homeFunctions} from '../view/Home.js'
import { accesFunctions } from '../view/Acces.js';

const changeView = (route)=> {
  const id = route.split('/')[1];
  const container = document.getElementById('container')
  container.innerHTML = '';
  switch (route){
    case '':
    case '#':
    case '#/':
      { const view = container.appendChild(components.home());
        homeFunctions();
        return view
      }
    case '#/Register':
      { const view = container.appendChild(components.register());
        registerFunctions();
        return view;
      }
    case '#/Acces':
      { const view = container.appendChild(components.acces())
        accesFunctions();
        return view;
      }
    case '#/Post':
      { return container.appendChild(components.post())}
    default:
      return container.appendChild(components.different())
  }
  console.log(route)
}

export {changeView}