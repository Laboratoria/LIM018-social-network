import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  onGetPosts,
  updatePost,
} from '../firebase/post.js';
import { getCurrentUser } from '../firebase/auth.js';
import { userInfoView } from '../lib/index.js';

export const createHomeView = () => {
  const viewHome = `
    <header class='header'>
      <nav class='navBar'>
        <ul>
           <li><a href='#/home'><img src='./images/LOGO-BLANCO.png' class='logo'></a>THE SOCIAL FOOD</li>
        </ul>
        <input type='text' name='search' placeholder='Buscar...' class='search icon'></li>
        <ul class='interactions'>   
           <li><a href='#/home'><img src='./images/home.png' class='icon'></a>Home</li>
           <li><a href='#/notifications'><img src='./images/notification.png' class='icon'></a>Notificaciones</li>
           <li><a href='#/user'><img src='./images/user.png' class='icon'></a>Perfil</li>
        </ul>
      </nav>
    </header>
    <section class='main'>
      <div class='containerInfo'>
      </div>  
      <div id='publications' class='publications'>
        <div class='content'> 
          <form class='user-post' id='post-container'>
            <div class='containerInfoPost'>
            </div>
            <div class='container-texta'>
              <textarea placeholder='¿Tienes alguna recomendación?' name='userPost' value='' id='userPost' class='area-post'></textarea>
            </div>
          </form>
          <p id='msg'></p>
          <div class='container-btnpost'>
            <button type='button' id='buttonPost' class='buttonPost'>Publicar</button>
            <button type='button' id='deletePost' class='buttonPost delete'>Borrar</button> 
          </div>
        </div>
        <div class='text'>Lo nuevo en The Social Food</div>
        <div id='getPosts' class='get-post'></div>
      </div>
    </section> 
    `;
  const newSection = document.createElement('section');
  newSection.setAttribute('class', 'homeSection');
  newSection.innerHTML = viewHome;
  const userInfoContainer = newSection.querySelector('.containerInfo');
  const userInfoPost = newSection.querySelector('.containerInfoPost');
  userInfoView(userInfoContainer);
  userInfoView(userInfoPost);
  return newSection;
};

export const createBehaviorHomeView = () => {
  const buttonPost = document.querySelector('#buttonPost');
  const delPost = document.querySelector('#deletePost');
  const userPost = document.querySelector('#userPost');
  const dataPosts = document.querySelector('#getPosts');
  const msg = document.querySelector('#msg');

  const generatePostContent = (post) => {
    const likeActive = post.data().likes.includes(getCurrentUser().uid);
    const userImage = post.data().photoUser !== null ? post.data().photoUser : './images/USUARIO-ICONO.png';
    const postContent = `
      <div class='content'>
        ${post.data().userId === getCurrentUser().uid ? `<div class='btn-delete-edit'>
          <i data-id=${post.id} class='buttonPost-delete'><img src='./images/trash-bin.png' class='pub-icon'></i>
          <i data-id=${post.id} class='buttonPost-edit'><img src='./images/editar.png' class='pub-icon'></i>
        </div>` : ''}
        <div class='show-user'>
          <div class='userImage'>
            <img src='${userImage}' class='icon-profile' referrerpolicy='no-referrer'>
          </div>
          <p>${post.data().userName !== null ? post.data().userName : 'Usuario'}</p>
        </div>
        <div class='container-texta'>
          <textarea id=${post.id} class='post-text' readonly>${post.data().content}</textarea>
        </div>  
        <div class='like-section'>  
          <i data-id=${post.id} class='btn-like'><img src='${likeActive ? './images/heart.png' : './images/like.png'}' class='pub-icon'></i>
          <p>${post.data().likes.length} me gusta</p>
        </div>
        <div class='btn-save'>  
          <button id=${`btn-${post.id}`} class='hidden'>Guardar</button>
        </div>  
      </div>
    `;
    return postContent;
  };

  const queryPosts = () => {
    getPosts()
      .then((postsRef) => {
        let content = '';

        postsRef.forEach((postR) => {
          content += generatePostContent(postR);
          dataPosts.innerHTML = content;

          const deleteBtns = document.querySelectorAll('.buttonPost-delete');
          const editBtns = document.querySelectorAll('.buttonPost-edit');
          const likeBtns = document.querySelectorAll('.btn-like');

          const deleteCurrentPost = (e) => {
            const idDeleteBtn = e.currentTarget.dataset.id;
            deletePost(idDeleteBtn);
          };
          deleteBtns.forEach((btn) => {
            btn.addEventListener('click', deleteCurrentPost);
          });

          const editCurrentPost = (e) => {
            const idEditBtn = e.currentTarget.dataset.id;
            const textPost = document.getElementById(idEditBtn);
            textPost.removeAttribute('readonly');

            const btnSave = document.getElementById(`btn-${idEditBtn}`);
            btnSave.setAttribute('class', 'buttonPost');
            btnSave.addEventListener('click', () => {
              updatePost(idEditBtn, { content: textPost.value });
            });
          };

          editBtns.forEach((btn) => {
            btn.addEventListener('click', editCurrentPost);
          });

          const countingLikesOfPost = async (e) => {
            const idLikeBtn = e.currentTarget.dataset.id;
            const postDoc = await getPost(idLikeBtn);
            const likesOfPost = postDoc.data().likes;
            const idUser = getCurrentUser().uid;

            if (likesOfPost.includes(idUser)) {
              const compareIdLikesUsers = likesOfPost.filter((idLikeData) => idLikeData !== idUser);
              updatePost(idLikeBtn, { likes: compareIdLikesUsers });
            } else {
              updatePost(idLikeBtn, { likes: likesOfPost.concat(idUser) });
            }
          };

          likeBtns.forEach((btn) => {
            btn.addEventListener('click', countingLikesOfPost);
          });
        });
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  onGetPosts(queryPosts);

  // Crear nuevo documento en data de post
  buttonPost.addEventListener('click', () => {
    const postContainer = document.querySelector('form');
    // evaluar contenido que ingresó el usuario en textarea
    if (userPost.value !== '') {
      msg.classList.remove('errorMessage');
      msg.textContent = '';

      createPost({
        userName: getCurrentUser().displayName,
        content: userPost.value,
        userId: getCurrentUser().uid,
        likes: [],
        photoUser: getCurrentUser().photoURL,
      })
        .then((docRef) => {
          // eslint-disable-next-line no-console
          console.log(docRef);
          postContainer.reset();
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    } else {
      msg.textContent = 'Por favor, escribe un comentario';
      msg.classList.add('errorMessage');
    }
  });

  delPost.addEventListener('click', () => {
    userPost.value = '';
  });
};

// referrerpolicy="no-referrer"
// <img src=${userImgProfile} alt="imagen de perfil" referrerpolicy="no-referrer">
