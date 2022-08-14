import {
  getPosts,
  createPost,
  deletePost,
  onGetPosts,
} from '../firebase/post.js';
import { getCurrentUser } from '../firebase/auth.js';

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
        <div class='userInfo'>
          <div class='userImage'>
            <img src='./images/user-profile-female.png' class='icon-profile'>
          </div>
          <p>USUARIO</p>
        </div>
      </div>  
      <div id='publications' class='publications'>
        <div class='content btn-flex-end'>
          <button type='button' class='buttonPost xBut'>x</button> 
          <form class='user-post' id='post-container'>
            <div>
              <div>Usuario</div>
              <div class='userImage'>
                <img src='./images/user-profile-female.png' class='icon-profile'>
              </div>
            </div>
            <textarea placeholder='¿Tienes alguna recomendación...?' name='userPost' value='' id='userPost' class='area-post'></textarea>
          </form>
          <p id='msg'></p>
          <button type='button' id='buttonPost' class='buttonPost'>Publicar</button> 
        </div>
        <div class='text'>Lo nuevo en The Social Food</div>
        <div id='getPosts' class='get-post'></div>
      </div>
    </section> 
    `;
  const newSection = document.createElement('section');
  newSection.setAttribute('class', 'homeSection');
  newSection.innerHTML = viewHome;
  return newSection;
};

export const createBehaviorHomeView = () => {
  const buttonPost = document.querySelector('#buttonPost');
  const userPost = document.querySelector('#userPost');
  const dataPosts = document.querySelector('#getPosts');
  const msg = document.querySelector('#msg');

  const generatePostContent = (post) => {
    const postContent = `
    <div class='content'>
      <div class='btn-delete-edit'>
        <button data-id=${post.id} class='buttonPost-delete'><img src='../images/trash-bin.png' class='pub-icon'></button>
        <button data-id=${post.id} class='buttonPost-edit'><img src='../images/editar.png' class='pub-icon'></button>
      </div>
      <div>
        <div>Usuario</div>
        <div class='userImage'>
          <img src='./images/user-profile-female.png' class='icon-profile'>
        </div>
      </div>   
      <textarea id=${post.id} class='post-text user-post area-post' readonly>${post.data().content}</textarea>
      <button data-id=${post.id} class='btn-like'><img src='../images/like.png' class='pub-icon'></button>
      <input id=${`btn-${post.id}`} type='button' value='Guardar' class='hidden'>
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

          deleteBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              const idDeleteBtn = e.currentTarget.dataset.id;
              deletePost(idDeleteBtn);
            });
          });

          editBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              const idEditBtn = e.currentTarget.dataset.id;
              const textPost = document.getElementById(idEditBtn);
              textPost.removeAttribute('readonly');
              const btnSave = document.getElementById(`btn-${idEditBtn}`);

              console.log(btnSave);
              btnSave.setAttribute('class', 'buttonPost');
            });
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
      console.log(getCurrentUser());
      createPost({ content: userPost.value, userId: getCurrentUser().uid })
        .then((docRef) => {
          // eslint-disable-next-line no-console
          console.log(docRef);
          postContainer.reset();
        })
        // eslint-disable-next-line no-console
        .catch((e) => {
          alert(e, 'Ocurrió un error, inténtelo más tarde');
          console.log(e);
        });
    } else {
      msg.textContent = 'Por favor, escribe un comentario';
      msg.classList.add('errorMessage');
    }
  });
};
