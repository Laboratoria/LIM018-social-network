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
    container.appendChild(defaultExport())
    console.log(container)
  });
});

describe('testeando accesFunctions', () => {
  it('debería ser una función', () => {
    expect(typeof accesFunctions).toBe('function');
  });
});


