/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
import {
  updatePost,
} from '../firebase/firebase.js';

export function editarPost(btnEid, postDescription1, containerMuro) {
  const modal = ` <div id='modalEditPos' class="modalEditPost2" style="display:block">

        <p> ¿Deseas editar este Post?</p>
        <input class="inputEditPost">
        <button id=${btnEid}  class="buttonAceptEditPost">Aceptar</button>
        <button class="buttonCancelEditPost">Cancelar</button>
        </div>`;

  const modalEditPosts = containerMuro.querySelector('.modalEditPost');
  modalEditPosts.innerHTML = modal;
  const btnAceptEditPost = modalEditPosts.querySelector('.buttonAceptEditPost');
  const btnCancelEditPost = modalEditPosts.querySelector('.buttonCancelEditPost');
  const inputEditPost1 = modalEditPosts.querySelector('.inputEditPost');
  inputEditPost1.value = postDescription1;
  const idboton = btnEid;

  modalEditPosts.style.display = 'block';

  btnAceptEditPost.addEventListener('click', (ea) => {
    ea.preventDefault();
    updatePost(idboton, {
      postDescription: inputEditPost1.value,
    });
    modalEditPosts.style.display = 'none';
  });

  btnCancelEditPost.addEventListener('click', (es) => {
    es.preventDefault();
    modalEditPosts.style.display = 'none';
  });
}
