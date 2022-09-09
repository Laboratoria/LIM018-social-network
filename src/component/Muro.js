/* eslint-disable import/no-cycle */
import {
  showPostFunt,
  exitPost,
  // likes,
} from './post.js';

// 1. HEADER DEL MURO, SE VA A MANTENER FIJO.............................
export function muro() {
  const viewMuro = `
    <div id="muroDiv" class="muroDiv">
        <nav class="headerContent">
            <div class="'logoContent">
              <img class="logo" src="img/logo1.png" alt="logo"> </img>
              <p class="logoName">Travelers</p>
            </div>
           
            <div class="iconsContent">            
                <i id="iconExit"class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </nav>

        <form class="newPostDiv">
            <input type="text" class="newPost" placeholder="Cuentanos tu aventura Traveller"></input>
            <button class="publicar"><i class="fa-solid fa-paper-plane"></i></button>     
        </form>

        <!--POST-->

        <div class="containerPost"> </div>

        <div class="modalDelete" style="display:none">
           <div class="modalDelete">
              <p> ¿Deseas borra este Post?</p>
              <button class="buttonAceptDeletePost">Aceptar</button>
              <button class="buttonCancelDeletePost">Cancelar</button>
           </div>      
        </div>

        <form id='modalEditPos' class="modalEditPost" style="display:none">
        </form>
    </form>`;

  const containerViewMuro = document.createElement('div');
  containerViewMuro.innerHTML = viewMuro;
  showPostFunt(containerViewMuro);

  const iconExit = containerViewMuro.querySelector('#iconExit');
  iconExit.addEventListener('click', (e) => e.then(exitPost()));
  return containerViewMuro;
}

export function mostrarPost(doc) {
  const post = doc.data();
  // console.log('muro', post);
  const viewpost = `<div class="postsContainerDiv">
    <div class="headerPostContainer">
       <div class="userPostContainer">
          <img class=" postUsePhoto src="${post.photoUser} >
          <p class="postUserName">${post.userName}</p>
       </div>
       <form class="iconsEditDeletePostContainer">
          
          <button class="btnEdit" id=${doc.id} ><i id="btnEdit" class="fa-solid fa-pencil"></i></button>
          <button class="btnDelete" id=${doc.id} ><i class="fa-solid fa-trash-can"></i></button>
       </form>
    </div>
    <div class="post">
          <div class="postTextDiv ">
              <textarea class="posttext"  > ${post.postDescription}</textarea>
          </div>
          <div class="postIcon ">
              <button class="btnLike" id=${doc.id}><i id='like' class="fa-regular fa-heart"></i></button>
              <p class='numberLike'> ${post.likes.length} </p>
          </div>
    </div>
  </div>
  `;
  // likes(post.uId, post);
  return viewpost;
}
