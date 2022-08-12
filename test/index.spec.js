// importamos la funcion que vamos a testear
import access, { accesFunctions} from "../src/view/Acces.js";
jest.mock('../src/lib//index.js')

describe('testeando access', () => {
  it('debería ser una función', () => {
    expect(typeof access).toBe('function');
  });
  it('existe el boton acces', () => {
    const container = document.createElement('section')
    document.body.appendChild(container)
    container.appendChild(access())
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const accessButton = document.getElementById('acces')
    expect(email instanceof HTMLElement).toBeTruthy();
    expect(password instanceof HTMLElement).toBe(true);
    expect(accessButton instanceof HTMLElement).toBeTruthy();
  });
});

describe('testeando accesFunctions', () => {
  it('debería ser una función', () => {
    expect(typeof accesFunctions).toBe('function');
  });
  it('click del boton access', () =>{
    const container = document.createElement('section')
    document.body.appendChild(container)
    container.appendChild(access())
    accesFunctions()
    const accessButton = document.getElementById('acces')
    accessButton.click()
    const merror = document.getElementById('message-error');
    expect(merror.innerHTML).toBe('ingresa email o password faltante');
    const user = document.getElementById('email');
    user.value = "belen123456@gmail.com"
    const pass = document.getElementById('password');
    pass.value = "123456"
    accessButton.click()
    console.log(window.location.hash)
    expect(window.location.hash).toBe("#/Post");
    console.log(window.location.hash)
  })
});


