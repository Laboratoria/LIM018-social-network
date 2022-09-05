/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
// import { async } from 'regenerator-runtime';
import {
  savebdPost, onGetPosts, auth, signOut, deletePosts, updatePost, getPost,
} from '../firebase/firebase.js';
import { navigation } from '../main.js';
import { mostrarPost } from './Muro.js';

// 1.enviar y almacenar datos nuevos-------------------------------------------------------------

export function sendNewPost(inputRe) {
  const currentUser = auth.currentUser;
  savebdPost(currentUser.uid, currentUser.displayName, inputRe.value);
}

// 2. Eliminar post---------------------------------------------------------------------

export function deletePost(idpost) {
  deletePosts(idpost);
}

// 3. Editar post---------------------------------------------------------------------
/* export function editPost(idEdit, newInput) {

  updatePost(idEdit, {
    postDescription: newInput,
  });
*/
export function editPost(btnE, containerMuro) {
  const modalEditPosts = containerMuro.querySelector('.modalEditPost');
  const inputEditPost = containerMuro.querySelector('.inputEditPost');
  const btnAceptEditPost = containerMuro.querySelector('.buttonAceptEditPost');
  const btnCancelEditPost = containerMuro.querySelector('.buttonCancelEditPost');

  // console.log('editar funcion');
  // btnE.addEventListener('click', async () => {
  btnE.addEventListener('click', async (ez) => {
    ez.preventDefault();
    modalEditPosts.style.display = 'block';

    const doc = await getPost(btnE.id);

    const postData = doc.data();
    const x = postData.postDescription;
    console.log('btne dentro de editar', btnE);
    inputEditPost.innerHTML = x;

    btnAceptEditPost.addEventListener('click', (ea) => {
    //  editPost(btnE.id, inputEditPost.value);
      console.log(btnCancelEditPost);
      ea.preventDefault();

      updatePost(btnE.id, {
        postDescription: inputEditPost.value,
      });

      modalEditPosts.style.display = 'none';
    });
    btnCancelEditPost.addEventListener('click', (es) => {
      es.preventDefault();
      modalEditPosts.style.display = 'none';
    });
  });

  // console.log('EDIRT', newInput);
}
// 4. funcion para mostrar todos los post ----------------------------------------------

export function showPostFunt(containerMuro) {
  callPost(containerMuro);
}

export function callPost(containerMuro) {
  const btnEditDelete = containerMuro.querySelector('.iconsEditDeletePostContainer');
  const containerPost = containerMuro.querySelector('.containerPost');
  const buttonSharePost = containerMuro.querySelector('.publicar');
  const inputRe = containerMuro.querySelector('.newPost');
  const modalDelete = containerMuro.querySelector('.modalDelete');
  const buttonAceptDeletePost = containerMuro.querySelector('.buttonAceptDeletePost');
  const buttonCancelDeletePost = containerMuro.querySelector('.buttonCancelDeletePost');
  // const modalEditPosts = containerMuro.querySelector('.modalEditPost');
  // const inputEditPost = containerMuro.querySelector('.inputEditPost');
  // const btnAceptEditPost = containerMuro.querySelector('.buttonAceptEditPost');
  // const btnCancelEditPost = containerMuro.querySelector('.buttonCancelEditPost');

  buttonSharePost.addEventListener('click', (e) => {
    e.preventDefault();
    sendNewPost(inputRe);
  });

  onGetPosts((querySnapshot) => {
    let viewposts = '';
    querySnapshot.forEach((doc) => {
      viewposts += mostrarPost(doc);// constante q muestra los posts
    });

    // -----------evento para borrar posts......................................
    containerPost.innerHTML = viewposts;// colocando los templates en el div del muro

    const arrayBtnDelete = containerPost.querySelectorAll('.btnDelete');

    arrayBtnDelete.forEach((btn) => {
      btn.addEventListener('click', () => {
        modalDelete.style.display = 'block';

        buttonAceptDeletePost.addEventListener('click', (ea) => {
          ea.preventDefault();
          deletePost(btn.id);
          modalDelete.style.display = 'none';
        });

        buttonCancelDeletePost.addEventListener('click', (ec) => {
          ec.preventDefault();
          modalDelete.style.display = 'none';
        });
      });
    });

    // -----------evento para editar posts......................................
    const arrayBtnEdit = containerPost.querySelectorAll('.btnEdit');

    arrayBtnEdit.forEach((btnE) => {
      editPost(btnE, containerMuro);
      // btnEditDelete.reset();
    });

    // -----------evento para dar LIKE------------------
    const btnLike = containerPost.querySelectorAll('.btnLike');

    btnLike.forEach((btnL) => {
      btnL.addEventListener('click', () => {
        // const countLike = 0;
        console.log('like');
      });
    });
  });
}

// salir de la sesion--------
export const exitPost = () => {
  signOut(auth).then(() => {
    alert('Estás seguro que quieres salir');

    navigation('/');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(`${errorCode} ${errorMessage}`);
  });
};
