
// Import the functions you need from the SDKs you need
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrjTLw9QLhoJzC7qHJiKwFu3DRdtj1xgY",
    authDomain: "laberintolector-5688a.firebaseapp.com",
    projectId: "laberintolector-5688a",
    storageBucket: "laberintolector-5688a.appspot.com",
    messagingSenderId: "800505099476",
    appId: "1:800505099476:web:e8781a0717d6a00bbbf741",
    measurementId: "G-4MXS3Q2K9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Register users
const auth = getAuth(app);

// Funciones auth para autenticar a los usuarios //
export const createUser = (user, password) => {
    return createUserWithEmailAndPassword(auth, user, password);
}




