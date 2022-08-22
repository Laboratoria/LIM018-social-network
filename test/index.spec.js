// importamos la funcion que vamos a testear
import { changeView } from '../src/controller.js';
import { createSignUpView, createBehaviorSignUpView } from '../src/views/sign-up-view.js';
import { signUpWithEmail, emailVerification } from '../src/firebase/auth.js';
// import { userInfo } from '../src/firebase/post.js';

jest.mock('../src/firebase/auth.js');
jest.mock('../src/firebase/post.js');

describe('changeView', () => {
  document.body.innerHTML = '';
  window.location.href = '#/home';
  it('debería ser una función', () => {
    expect(typeof changeView).toBe('function');
  });

  it('debería imprimir la ruta log-in', () => {
    changeView('#/log-in');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });

  it('debería imprimir la ruta sign-up', () => {
    changeView('#/sign-up');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });

  it('debería imprimir la ruta home', () => {
    changeView('#/home');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });

  it('debería imprimir la ruta ""', () => {
    changeView('');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });

  it('debería imprimir ruta default', () => {
    changeView('#/otraruta');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });
});

describe('signupview', () => {
  const signUpView = createSignUpView();
  let email;
  let password;
  let btnSignUp;
  let eMessage;

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(signUpView);
    email = document.getElementById('email');
    password = document.getElementById('userPassword');
    btnSignUp = document.getElementById('submitSingUp');
    eMessage = document.getElementById('eMessage');
    createBehaviorSignUpView();
  });

  it('debería devolver un elemento html', () => {
    expect(signUpView instanceof HTMLElement).toBe(true);
  });

  it('debería coincidir con el template', () => {
    expect(signUpView).toMatchSnapshot();
  });

  it('debería mostrar un modal cuando se registre correctamente', (done) => {
    email.value = 'prueba@hotmail.com';
    password.value = '123456';

    signUpWithEmail.mockResolvedValue({
      user: { email: 'prueba@hotmail.com', password: '123456', uid: 'fnvfyy' },
    });
    emailVerification.mockImplementationOnce(() => Promise.resolve());

    btnSignUp.click();

    setTimeout(() => {
      const modalContainer = document.querySelector('.modalContainer');
      expect(modalContainer.classList.contains('reveilModal')).toBe(true);
      done();
    }, 0);
  });

  it('Debería mostar mensaje de error si no tiene formato válido', () => {
    email.value = 'prueba';
    password.value = '123456';

    signUpWithEmail.mockRejectedValueOnce(new Error('Firebase: Error (auth/invalid-email).'));
    btnSignUp.click();
    expect(eMessage.textContent).toEqual('Debe ingresar un correo electrónico válido');
  });
});
