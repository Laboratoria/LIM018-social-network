import { signInPopup, GoogleAuthProvider } from "../lib/index.js"

export default ()=> {
    const viewHome = `
    <section class="contenido_container1" id="container1">
    <div class=button>
    <button class="button-register" id="optionregister">
        Registrarse
    </button>
    <button class="button-acces" id="optionacces">
        Iniciar Sesión
    </button>
    <button class="button-google" id="optiongoogle">
        Iniciar Sesión con Google
    </button>
    </div>
    </section>`

    const divElement = document.createElement('div')
    divElement.innerHTML = viewHome;

    return divElement;
}

export const homeFunctions = () => {
    const btnRegister = document.getElementById('optionregister')
    const btnAcces = document.getElementById('optionacces')
    const btnGoogle = document.getElementById('optiongoogle')

    btnRegister.addEventListener('click', (e) => {
        console.log('hola ingresaste al registro')
        window.location.hash ="#/Register"
    })

    btnAcces.addEventListener('click', (e) => {
        console.log('hola ingresaste al acceso')
        window.location.hash ="#/Acces"
    })

    btnGoogle.addEventListener('click', (e) => {
        console.log('hola ingresaste al acceso mediante google')
        signInPopup()
        .then((result)=>{
            console.log(result);
            window.location.hash ="#/Post"
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
        
    })
}




