// Este es el punto de entrada de tu aplicacion

import { myFunction, signUp } from './lib/index.js';
import { changeView } from './viewController/view-controller.js';

myFunction();
const init = () => window.addEventListener('hashchange', () => changeView(window.location.hash));
window.addEventListener('load', init);

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', signUp);
