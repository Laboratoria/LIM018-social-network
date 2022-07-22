
import { signOutUser,
    savePost, getPost, getUser, onGetPost, deletePost
} from '../firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
// import { likeCounter } from '../lib/index.js';

export default () => {
    const viewHome = `<section class= "sectionHome">
    <header class= "headerHome">
        <nav>
            <input type="checkbox" id="check">
            <label for="check" class="checkbtn">
                <img class="btnMenuBar" src="image/menu.png" >
            </label>

            <div class=logoComplete>
                <img class="logoNav" src="image/GATITO LOGO.png">
                <label class="logoNameNav">PUUR LOVE</label>
            </div>
            
            <ul class="menuLeft">
                <li>
                    <a href="#/home">
                        <img class="icon" src="image/home.png">
                        <label class="home">Inicio</label>
                    </a>
                </li>
                <li>
                    <a href="#/perfil">
                        <img class="icon" src="image/perfil.png">
                        <label class="profile">Perfil</label>
                    </a>
                </li>
            </ul>
            
            <ul class="menuTop">
                <li>
                    <a href="#/home">
                        <img class="icon home" src="image/home.png">
                        <label class="home">Inicio</label>
                    </a>
                </li>
                <li>
                    <a href="#/perfil">
                        <img class="icon profile" src="image/perfil.png">
                        <label class="profile">Perfil</label>
                    </a>
                </li>
                <li>
                    <div class= "search">
                        <img class="icon searchIcon" src="image/buscar.png">
                        <input class="searchInput" type="search" placeholder="Buscar">
                    </div>           
                </li>
                <li>
                
                    <button class="btnSalir" id="signOut">Salir</button>

                </li>
            </ul>
        </nav>
    </header>
    <section class= "secHome">
        <div class="postAddBtn">

        <form class="formPost" id="formPost">
            <textarea type="text" class= "addPost" id="addPost" placeholder="Agrega una publicación:" ></textarea>
            <button type="submit" class="btnPost" id="btnPost" >Publicar</button>
        </form>
        
        </div>
        
        <div id="postContainer"></div>
    </section>
    </section>`;

    const divElem = document.createElement('div');
    divElem.classList.add('divElem');
    divElem.innerHTML = viewHome;
    return divElem;
};

export const SignOutActive = (idElementSignOut) => {
    const idBtnSignOut = document.getElementById(idElementSignOut);
    idBtnSignOut.addEventListener('click', () => {
        window.location.href = '#/login';
        signOutUser()
            .then(() => {
                // Sign-out successful.
                console.log('Salió');
                window.location.href = '#/login';
            })
            .catch((error) => {
                // An error happened.
                console.log('Ocurrió un error al querer salir' + error);
            });
    });
};


export const postHome = (idPost, formPost, idpostContainer) => {
    const PostH = document.getElementById(formPost);
    PostH.addEventListener('submit', async (e) => {
      e.preventDefault();
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
    //   const fecha = new Date();
    const fecha = new Date().toDateString();
        // var hoy = new Date();
        // var fechaH = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        // var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        // var fechaYHora = fechaH + ' ' + hora;
        // const fecha = fechaYHora;

      const newpost = document.getElementById(idPost).value;
      let arrayId = [];

     const response = await getUser()
    response.forEach((doc) => {
                const arrayDocsId = doc.id;
                const arrayDocsData = doc.data();
                arrayId.push({
                    id: arrayDocsId,
                    name : arrayDocsData.name
                })
    });
        let pruebaName;
        for (let i = 0; i < arrayId.length; i++) {
            if (uid == arrayId[i].id) {
                pruebaName = arrayId[i].name
            }    
        }
        console.log(pruebaName);
        const nameUser=pruebaName;


      console.log(savePost(nameUser, fecha, newpost, uid));
      PostH.reset();
    });
};

export const getP = async (idpostContainer) => {
    const postContainer = document.getElementById(idpostContainer);
    const dataPost = await getPost();
    onGetPost((dataPost) =>{
        postContainer.innerHTML = '';
        dataPost.forEach((doc) => {
            //console.log(doc.data());
            const dataNewPost = doc.data();
            // const dataUid = doc.data().uid;
            postContainer.innerHTML += `
            <div class="postComplete">
                <div class="userNameDots">
                    <label class="userNamePost">${dataNewPost.nameUser}</label>
                    <div class="dotsEditDelete">
                        <img id="elementDots" class="dots" src="image/tresPuntos.png">
                    </div>
                </div>
                <div class="optionSetingsPost optionSetingsPostStyle">
                        <label class="editBtn editBtnStyle">Editar</label>
                        <label class="deleteBtn deleteBtnStyle" data-id="${doc.id}">Eliminar</label>
                        </div>
                <label class="date">${dataNewPost.fecha}</label>
                <label class="postDescription">
                    ${dataNewPost.newpost}
                </label> 
                <div class="likeComment">
                    <div class="likeContainer">
                        <button class= "likeBtn">
                            <img class="likeIcon" src="image/likeHeart.png">
                        </button>
                        <label id="likeNumber" class="likeNumber">N°</label>
                    </div>
                    <div class= "btnCommentContainer">
                    <button class="btnComment">Comentar</button>
                    </div>
                </div>
            </div>`
        })
    
        const dots = document.querySelectorAll('.dots');
        const optionSetingsPost = document.querySelectorAll('.optionSetingsPost');
        for(let i=0; i<dots.length; i++){
            optionSetingsPost[i].style.display = 'none';
            dots[i].addEventListener('click', () => {
                
                if(optionSetingsPost[i].style.display === 'none'){
                    optionSetingsPost[i].style.display = 'flex';
                }
                 else{ optionSetingsPost[i].style.display = 'none';
                }
            });
        }

        const deleteBtn = document.querySelectorAll('.deleteBtn');
        for(let i=0; i<deleteBtn.length; i++){
            deleteBtn[i].addEventListener('click', ({target : {dataset}}) => {
                deletePost(dataset.id);
            });
        }

        const editBtn = document.querySelectorAll('.editBtn');
        for(let i=0; i<editBtn.length; i++){
            editBtn[i].addEventListener('click', () => {
            console.log('editing post');
            });
        }

        //cuando se cree el post debemos crear un elemento contador de likes con el valor de 0 para que alli podamos editar y guardar el contador
        const likeAction = document.querySelectorAll('.likeBtn');
        const likeNumber = document.querySelectorAll('.likeNumber');
        // este array lo debemos sacar del doc.data.contadordelikes
        let arrayCounter = [];
        for(let i=0; i<likeAction.length; i++){
            arrayCounter.push(' ');
        }
        // el counter lo deberíamos jalar del array traido del firebase (doc.data.contadordelikes)
        for(let i=0; i<likeAction.length; i++){
            let counter = 0;
            likeAction[i].addEventListener('click', () => {
                counter++;
                arrayCounter[i] = counter;
                likeNumber[i].innerHTML = counter;
            });
        };
    
    });
    
/*     const dots = document.querySelectorAll('.dots');
    const optionSetingsPost = document.querySelectorAll('.optionSetingsPost');
    dots.forEach(dotsSetings => 
        dotsSetings.addEventListener('click', () => {
            // showOptionSetings(optionSetingsPost);
            console.log('funciona click');
        optionSetingsPost.forEach( probandoDisplay =>  
        probandoDisplay.style.display = 'flex');
        })
    );   */ 

/*     const dots = document.querySelectorAll('.dots');
    //const optionSetingsPost = document.querySelectorAll('.optionSetingsPost');
    console.log(dots);
    dots.forEach(dotsSetings => 
        dotsSetings.addEventListener('click', () => {
            let elementDot = document.getElementById("elementDots");
            let padreEncontrado = elementDot.closest('.userNameDots');
            let elHermanoPerdido = padreEncontrado.querySelector('.optionSetingsPost');
            elHermanoPerdido.style.display = 'flex';
        })
    );   */

}
    
/*     const likeAction = document.querySelectorAll('.likeBtn');
    likeAction.forEach(btn => 
    btn.addEventListener('click', () =>{
        console.log("funciona like");
    })) */


// export const btnLikeAction = (classBtnLikeAction) => {
//     const likeAction = document.querySelectorAll(classBtnLikeAction);
//     likeAction.forEach(btn => 
//     btn.addEventListener('click', () =>{
//         console.log("funciona like");
//     }))
// /}

/* export const btnLikeCounter = (idBtn, idLikeNumber) =>{
  let counter = 0;
  const likeBtn = document.getElementById(idBtn);
  likeBtn.addEventListener('click', (e)=>{
    counter++;
    // let like = likeCounter(likeBtn);
    console.log(counter);
    document.getElementById(idLikeNumber).innerHTML = counter;
});*/

