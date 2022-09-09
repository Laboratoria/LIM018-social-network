import { login } from '../src/component/login.js';

jest.mock('../src/firebase/firebase.js');

describe('LOGIN', () => {
  it('login es una funcion', () => {
    expect(typeof login).toBe('function');
  });

  it('reconocimineto del boton INGRESAR', () => {
    document.body.appendChild(login());
    const buttonLoginTest = document.querySelector('#buttonLogin');
    expect(buttonLoginTest instanceof HTMLElement).toBe(true);
  });

  it('deberia cambiar la vista al ingresar con email y pasword', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootDiv = document.getElementById('root');

    rootDiv.appendChild(login());

    const buttonLogin = document.querySelector('#buttonLogin');
    const loginEmail = document.querySelector('#loginEmail');
    const loginPasword = document.querySelector('#loginPasword');

    loginEmail.value = 'arkelly.perez.alayo@gmail.com';
    loginPasword.value = '123456';

    buttonLogin.click();

    setTimeout(() => {
      expect(window.location.pathname).toBe('/muro');
    }, 1000);
  });

  it('no deberia ingresar porque no esta Registrado', () => {
    document.body.appendChild(login());

    const buttonLogin = document.querySelector('#buttonLogin');
    const loginEmail = document.querySelector('#loginEmail');
    const loginPasword = document.querySelector('#loginPasword');
    const messageDiv = document.querySelector('.messageDiv');

    loginEmail.value = '';
    loginPasword.value = '';

    buttonLogin.click();

    expect(messageDiv.textContent).toBe('Por favor ingresa tu email y password');
  });
});

describe('click en boton google denberia llevarme al muro', () => {
  it('deberia cambiar la vista al ingresar con google', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootDiv = document.getElementById('root');

    rootDiv.appendChild(login());

    const btnGoogle = document.querySelector('#btnGoogle');

    btnGoogle.click();

    setTimeout(() => {
      expect(window.location.pathname).toBe('/muro');
    }, 1000);
  });
});

describe('click en boton facebook denberia llevarme al muro', () => {
  it('deberia cambiar la vista al ingresar con google', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootDiv = document.getElementById('root');

    rootDiv.appendChild(login());

    const btnFacebook = document.querySelector('#btnFacebook');

    btnFacebook.click();

    setTimeout(() => {
      expect(window.location.pathname).toBe('/muro');
    }, 1000);
  });
});
