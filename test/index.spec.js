// importamos la funcion que vamos a testear
import defaultExport, { accesFunctions} from "../src/view/Acces.js";

jest.mock('../src/lib/index.js', () =>{
  return{
    __esModule: true,
    // ...originModule,
    // signInWithEmailAndPassword: jest.fn(auth, user, password) => 'mocked baz',
  }
})

describe('testeando default', () => {
  it('debería ser una función', () => {
    expect(typeof defaultExport).toBe('function');
  });
  it('existe el boton acces', () => {
    const container = document.createElement('section')
    document.body.appendChild(container)
    container.appendChild(defaultExport())
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const acces = document.getElementById('acces')
    console.log('email')
    expect(email instanceof HTMLElement).toBeTruthy();
    expect(password instanceof HTMLElement).toBe(true);
    expect(acces instanceof HTMLElement).toBeTruthy();
    console.log(container)
  });
});

describe('testeando accesFunctions1', () => {
  it('debería ser una función', () => {
    expect(typeof accesFunctions).toBe('function');
  });
  it('debería ejecutar la funcion accesFunctions2', () => {
    expect(typeof accesFunctions).toBe('function');
  });

});

describe('testeando accesFunctions2', () => {
  it('debería ser una función', () => {
    expect(typeof accesFunctions).toBe('function');
  });
  it('debería ejecutar la funcion singIn', () => {
    expect(typeof accesFunctions).toBe('function');
  });

});
