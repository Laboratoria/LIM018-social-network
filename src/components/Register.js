// eslint-disable-next-line import/no-cycle
// yure :)
import { onNavigate } from '../main.js';

const Register = {
  formRegister: document.createElement('form'),
  createHTML: function() {
    const divRegister = document.createElement('div');
    divRegister.className = 'divRegister'
    const divArrowRegister = document.createElement('div');
    divArrowRegister.className = 'divArrowRegister';
    const arrowImgRegister = document.createElement('img');
    arrowImgRegister.className = 'arrowImgRegister';
    arrowImgRegister.addEventListener('click', () => onNavigate('/'));
    arrowImgRegister.src = '/img/arrowregister.png';
    arrowImgRegister.alt = 'ArrowLeft';
    divArrowRegister.appendChild(arrowImgRegister);
    divRegister.appendChild(divArrowRegister);

    //logo
    const divLogoRegister = document.createElement('div');
    divLogoRegister.className = 'divLogoRegister';
    const imgLogo = document.createElement('img');
    imgLogo.className ='imgLogo';
    imgLogo.src = '/img/logo.png';
    imgLogo.alt = 'logo';
    divLogoRegister.appendChild(imgLogo);
    divRegister.appendChild(divLogoRegister)
    this.formRegister.className = 'formulario'
  
    //name
    const divName = document.createElement('div');
    divName.className = 'divName inputRegister';
    const inputName = document.createElement('input');
    inputName.className = 'inputForm';
    inputName.placeholder = 'Nombre y apellidos';
    inputName.autocomplete = 'off'
    inputName.id = 'name';
    inputName.required = true;
    const spanName = document.createElement('span')
    spanName.id = 'nameOk'
    const divImg = document.createElement('div');
    divImg.className = 'divimg';
    const imgName = document.createElement('img');
    imgName.className = 'imgName';
    imgName.src = '/img/Vector-name.png';
    imgName.alt = 'logoName';
    divName.appendChild(divImg);
    divImg.appendChild(imgName);
    divName.appendChild(inputName);
    inputName.appendChild(spanName);
    this.formRegister.appendChild(divName);
    divRegister.appendChild(this.formRegister);

    //email
    const divEmail = document.createElement('div');
    divEmail.className = 'divEmail inputRegister';
    const inputEmail = document.createElement('input')
    inputEmail.className = 'inputForm';
    inputEmail.placeholder = 'ejemplo@gmail.com';
    inputEmail.autocomplete = 'off';
    inputEmail.id = 'email'
    inputEmail.required = true;
    inputEmail.type = 'email'
    const divImgEmail = document.createElement('div');
    divImgEmail.className = 'divImgEmail'
    const imgEmail = document.createElement('img');
    imgEmail.className = 'imgEmail';
    imgEmail.src = '/img/Vector-email.png';
    imgEmail.alt = 'logoEmail';
    divEmail.appendChild(divImgEmail);
    divImgEmail.appendChild(imgEmail);
    divEmail.appendChild(inputEmail);
    this.formRegister.appendChild(divEmail);
    divRegister.appendChild(this.formRegister);
  
    //telefono
    const divPhone = document.createElement('div');
    divPhone.className = 'divPhone inputRegister';
    const inputPhone = document.createElement('input')
    inputPhone.className = 'inputForm no-arrow';
    inputPhone.placeholder = 'Teléfono';
    inputPhone.autocomplete = 'off';
    inputPhone.required = true;
    inputPhone.type = 'number'
    const divImgPhone = document.createElement('div');
    divImgPhone.className = 'divImgPhone'
    const imgPhone = document.createElement('img');
    imgPhone.className = 'imgPhone';
    imgPhone.src = '/img/Vector-phone.png';
    imgPhone.alt = 'logoPhone';
    divPhone.appendChild(divImgPhone);
    divImgPhone.appendChild(imgPhone);
    divPhone.appendChild(inputPhone);
    this.formRegister.appendChild(divPhone);
    divRegister.appendChild(this.formRegister);

    //contrasena
    const divContrasena = document.createElement('div');
    divContrasena.className = 'divContrasena inputRegister';
    const inputContrasena = document.createElement('input')
    inputContrasena.className = 'inputForm';
    inputContrasena.placeholder = 'Cree una contrasena';
    inputContrasena.autocomplete = 'off';
    inputContrasena.maxLength = '8';
    inputContrasena.type = 'password'
    inputContrasena.id = 'Password';
    inputContrasena.required = true;
    const divImgContrasena = document.createElement('div');
    divImgContrasena.className = 'divImgContrasena';
    const imgContrasena = document.createElement('img');
    imgContrasena.className = 'imgContrasena';
    imgContrasena.src = '/img/Vector-ojito.png';
    imgContrasena.alt = 'logoContrasena';
    divContrasena.appendChild(divImgContrasena);
    divImgContrasena.appendChild(imgContrasena);
    divContrasena.appendChild(inputContrasena);
    this.formRegister.appendChild(divContrasena);
    divRegister.appendChild(this.formRegister);

    this.crearMostrarContrasena(inputContrasena, imgContrasena)

    //confirmar contrasena
    const divConfirmContrasena = document.createElement('div');
    divConfirmContrasena.className = 'divConfirmContrasena inputRegister';
    const inputConfirmContrasena = document.createElement('input')
    inputConfirmContrasena.className = 'inputForm';
    inputConfirmContrasena.placeholder = 'Confime la contrasena';
    inputConfirmContrasena.autocomplete = 'off';
    inputConfirmContrasena.maxLength = '8';
    inputConfirmContrasena.id = 'ConfirmPassword';
    inputConfirmContrasena.type = 'password';
    inputConfirmContrasena.required = true ;
    const divImgContrasena2 = document.createElement('div');
    divImgContrasena2.className = 'divImgContrasena2';
    const imgConfirmContrasena = document.createElement('img');
    imgConfirmContrasena.className = 'imgConfirmContrasena';
    imgConfirmContrasena.src = '/img/Vector-ojito.png';
    imgConfirmContrasena.alt = 'logoConfirmContrasena';
    divConfirmContrasena.appendChild(divImgContrasena2);
    divImgContrasena2.appendChild(imgConfirmContrasena);
    divConfirmContrasena.appendChild(inputConfirmContrasena);
    this.formRegister.appendChild(divConfirmContrasena);
    divRegister.appendChild(this.formRegister);

    this.crearMostrarContrasena(inputConfirmContrasena, imgConfirmContrasena)

    // botton registrar
    const buttonRegister = document.createElement('div')
    buttonRegister.className = 'buttonRegister inputForm';
    const inputButtonRegister = document.createElement('button')
    inputButtonRegister.type = 'submit';
    inputButtonRegister.id = 'buttonRegister';
    inputButtonRegister.textContent ='Registrar';
    buttonRegister.appendChild(inputButtonRegister);
    this.formRegister.appendChild(buttonRegister);
    divRegister.appendChild(this.formRegister);

    // texto cuando ya tienen cuenta
    const divRegisterText = document.createElement('div');
    divRegisterText.className = 'divRegisterText';
    const aLogin = document.createElement('a');
    aLogin.className = 'aLogin';
    aLogin.textContent = '¿Ya tienes una cuenta? Haz click aquí';

    // const loginText = document.createTextNode('¿Ya tienes una cuenta? Haz click aquí');
    divRegisterText.appendChild(aLogin);
    divRegisterText.addEventListener('click', () => onNavigate('/login'));
    divRegister.appendChild(divRegisterText);

    this.verificarSubmit()

    return divRegister
  },
  crearMostrarContrasena: function(input, activador) {
    activador.addEventListener('click', (evt) => {
      input.type = (input.type === 'password' ? 'text' : 'password')
    })
  },
  // logica de validacion post submit (contraseña)
  verificarSubmit: function() {
    const verificarContrasenas = (evt) => {
      const inputPassword = evt.target.querySelector('#Password').value
      const inputConfirmPassword = evt.target.querySelector('#ConfirmPassword').value
  
      if (inputPassword === inputConfirmPassword) {
        alert("contrasenas igualitas")
        return true
      } else {
        alert ('las contraseñas no coinciden')
        return false
      }  
    }

    const verificarCorreoRegistado = (evt) => {
      // conexion a firebase y consultar si esta registrado o no
      return true
    }

    const validaciones = (evt) => {
      evt.preventDefault()

      if (verificarContrasenas(evt) === false) return
      if (verificarCorreoRegistado(evt) === false) return
      
      // En este punto ya todas las validaciones estan hechas
      alert("todas las validaciones correctas, listo para registrar el usuario")
    }

    // Validar
    this.formRegister.addEventListener('submit', validaciones)
  }
};

const init = () => {
  return Register.createHTML()
}

export default init
