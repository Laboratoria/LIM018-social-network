// importamos la funcion que vamos a testear

import home, { homeFunctions } from "../src/view/Home.js";


jest.mock('../src/lib/index.js', () =>{
  return{
    __esModule: true,
    // ...originModule,
    // signInWithEmailAndPassword: jest.fn(auth, user, password) => 'mocked baz',
  }
})

describe('testeando home', () => {
  it('debería ser una función', () => {
    expect(typeof home).toBe('function');
  });
  it('existen los botones optionregister optionacces optiongoogle', () => {
    const container = document.createElement('section')
    container.appendChild(home())
    console.log(container)
    expect(container.querySelectorAll("button").length).toBe(3)
  });
  it('permite click', () => {
    const container = document.createElement('section')
    container.appendChild(home())
    document.body.appendChild(container)
    homeFunctions()
    container.querySelector('#optionregister').click()
    container.querySelector('#optionacces').click()
    // container.querySelector('#optiongoogle').click()
    // expect()
  });

});

describe('testeando homeFunctions', () => {
  it('debería ser una función', () => {
    expect(typeof homeFunctions).toBe('function');
  });

});