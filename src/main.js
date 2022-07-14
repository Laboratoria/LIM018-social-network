// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller.js';

const init = () => window.addEventListener('hashchange', () => changeView(window.location.hash));
window.addEventListener('load', init);

// const formContainer = document.querySelector('#forms');
// console.log(formContainer);

// formContainer.addEventListener('click', (e) =>{
//   console.log(e.target);
// });
