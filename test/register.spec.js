import { register } from '../src/component/Register.js';
import * as mainFunctions from '../src/main.js';

jest.mock('../src/firebase/firebase.js');

describe('register es una funcion', () => {
  it('register es una funcion', () => {
    expect(typeof register).toBe('function');
  });

  it('reconocimiento del boton Registrar', () => {
    document.body.appendChild(register());
    const buttonRegisterTest = document.querySelector('#buttonRegister');

    expect(buttonRegisterTest instanceof HTMLElement).toBe(true);
  });

  it('Mensaje de error, por no ingresar los datos', () => {
    document.body.appendChild(register());
    const buttonRegisterTest = document.querySelector('#buttonRegister');
    const pasw = document.querySelector('#registerPasword');
    const messageDivTest = document.querySelector('.messageDiv');
    pasw.value = '';
    buttonRegisterTest.click();

    expect(messageDivTest.textContent).toEqual('Por favor ingresar los datos solicitados');
  });

  it('debería mostrar mensaje de  error', () => {
    document.body.appendChild(register());
    const buttonRegisterTest = document.querySelector('#buttonRegister');
    const email = document.querySelector('#registerEmail');
    const pasw = document.querySelector('#registerPasword');
    email.value = 'arkelly.perez.alayo';
    pasw.value = '34';

    buttonRegisterTest.click();
    const messageDivTest = document.querySelector('.messageDiv');
    expect(messageDivTest.textContent).toEqual('Por favor ingresar los datos solicitados');
  });

  it('debería mostrar mensaje de usuario creado', () => {
    document.body.appendChild(register());
    const buttonRegisterTest = document.querySelector('#buttonRegister');
    const email = document.querySelector('#registerEmail');
    const pasw = document.querySelector('#registerPasword');
    const name = document.querySelector('#registerName');
    const lastname = document.querySelector('#registerLastName');
    name.value = 'arkelly';
    lastname.value = 'perez';
    email.value = 'arkelly.perez.alayo@gmail.com';
    pasw.value = '123456';

    buttonRegisterTest.click();
    const messageDivTest = document.querySelector('.messageDiv');

    // magia negra
    const p = new Promise(process.nextTick);
    p.then(() => {
      expect(messageDivTest.textContent).toEqual('Usuario creado');
    });
  });
});

describe('regresar a la vista principal LOGIN', () => {
  it('reconocimiento del buttonBackToLogin', () => {
    document.body.appendChild(register());
    const buttonBackToLoginTest = document.querySelector('#buttonBackToLogin');

    expect(buttonBackToLoginTest instanceof HTMLElement).toBe(true);
  });

  it('regresar a la vista del login ', () => {
    document.body.appendChild(register());
    const spy = jest.spyOn(mainFunctions, 'navigation').mockImplementation(() => null);

    const buttonBackToLoginTest = document.querySelector('#buttonBackToLogin');
    buttonBackToLoginTest.click();
    expect(spy).toHaveBeenCalledWith('/');
  });
});
