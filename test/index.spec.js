// importamos la funcion que vamos a testear
import { changeView } from '../src/controller.js';
import { createSignUpView, createBehaviorSignUpView } from '../src/views/sign-up-view.js';
import { signUpWithEmail, emailVerification } from '../src/firebase/auth.js';
// import { userInfo } from '../src/firebase/post.js';

jest.mock('../src/firebase/auth.js');
jest.mock('../src/firebase/post.js');

describe('changeView', () => {
  document.body.innerHTML = '';
  it('debería ser una función', () => {
    expect(typeof changeView).toBe('function');
  });

  it('debería cambiar imprimir la ruta log-in', () => {
    changeView('#/log-in');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });

  it('debería cambiar imprimir la ruta sign-up', () => {
    changeView('#/sign-up');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });

  it('debería cambiar imprimir la ruta ""', () => {
    changeView('');
    const body = document.querySelector('body');
    expect(body).toMatchSnapshot();
  });
});

describe('signupview', () => {
  // const body = document.querySelector('body');
  // body.innerHTML = '';
  // const signUpView = createSignUpView();
  // body.appendChild(signUpView);
  const signUpView = createSignUpView();
  let email;
  let password;
  let btnSignUp;
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(signUpView);
    email = document.getElementById('email');
    password = document.getElementById('userPassword');
    btnSignUp = document.getElementById('submitSingUp');
    createBehaviorSignUpView();
  });

  it('debería devolver un elemento html', () => {
    expect(signUpView instanceof HTMLElement).toBe(true);
  });

  it('debería coincidir con el template', () => {
    expect(signUpView).toMatchSnapshot();
  });

  it('debería registrar un nuevo usuario', (done) => {
    email.value = 'prueba@hotmail.com';
    password.value = '123456';
    console.log(email.value);
    console.log(password.value);
    console.log('En el test', signUpWithEmail);
    signUpWithEmail.mockResolvedValue({
      user: { email: 'prueba@hotmail.com', password: '123456', uid: 'fnvfyy' },
    });
    console.log('En el test despues del resolved', signUpWithEmail);
    btnSignUp.click();
    expect(signUpWithEmail.mock.calls.length).toBeGreaterThan(0);
    console.log(signUpWithEmail(email.value, password.value));
    emailVerification.mockImplementationOnce(() => {
      expect(signUpWithEmail).toHaveBeenCalledWith('prueba@hotmail.com', '123456');
      done();
      return Promise.resolve();
    });
  });
});
