// importamos la funcion que vamos a testear
import { register } from '../src/component/Register.js';

describe('Register', () => {
  it('debería ser una función', () => {
    expect(typeof register()).toBe('HTMLElement');
  });
});
