// importamos la funcion que vamos a testear
import { accesFunctions, Acces } from '../src/view/Acces.js';
import {components} from '../src/view/index.js'

jest.mock('../src/lib/index.js', () =>{
  return{
    __esModule: true,
    // ...originModule,
    // signInWithEmailAndPassword: jest.fn(auth, user, password) => 'mocked baz',
  }
})

describe('testeando accesFunctions', () => {
  it('debería ser una función', () => {
    expect(typeof accesFunctions).toBe('function');
  });
  it('existe el boton acces', () => {
    const container = document.getElementById('container')
    console.log(container)
    //container.innerHTML = ''
    container.appendChild(components.acces())
    console.log(container)
    // accesFunctions()
    // const btnAcces = document.getElementById('acces')
    // console.log(btnAcces)
  });
});


