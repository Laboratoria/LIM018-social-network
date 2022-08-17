import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  onGetPosts,
  updatePost,
  getUser,
} from '../firebase/post.js';
import { getCurrentUser } from '../firebase/auth.js';

const userInfoView = (template) => {
  const userContainer = template;

  getUser(getCurrentUser().uid)
    .then((userRef) => {
      const userName = userRef.data().name;
      const userTemplate = `
        <div class='userInfo'>
          <div class='userImage'>
            <img src='./images/user-profile-female.png' class='icon-profile'>
          </div>
          <p>${userName}</p>
        </div>
      `;
      userContainer.innerHTML = userTemplate;
    });
  return userContainer;
};

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
        <div class='content btn-flex-end'>
          <button type='button' class='buttonPost xBut'>x</button> 
          <form class='user-post' id='post-container'>
            <div class='containerInfoPost'>
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
  const userInfoContainer = newSection.querySelector('.containerInfo');
  const userInfoPost = newSection.querySelector('.containerInfoPost');
  userInfoView(userInfoContainer);
  userInfoView(userInfoPost);

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
        <button data-id=${post.id} class='buttonPost-delete'><img src='./images/trash-bin.png' class='pub-icon'></button>
        <button data-id=${post.id} class='buttonPost-edit'><img src='./images/editar.png' class='pub-icon'></button>
      </div>
      <div>
        <p>Usuario</p>
        <div class='userImage'>
          <img src='./images/user-profile-female.png' class='icon-profile'>
        </div>
      </div>
      <textarea id=${post.id} class='post-text user-post area-post' readonly>${post.data().content}</textarea>
      <div class='like-section'>  
        <button data-id=${post.id} class='btn-like'><img src='./images/like.png' class='pub-icon'></button>
        <p>${post.data().likes.length} me gusta</p>
      </div>  
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
            console.log(idEditBtn);
            textPost.removeAttribute('readonly');
            const btnSave = document.getElementById(`btn-${idEditBtn}`);
            console.log(btnSave);
            btnSave.setAttribute('class', 'buttonPost');
            btnSave.addEventListener('click', () => {
              updatePost(idEditBtn, { content: textPost.value, userId: getCurrentUser().uid });
            });
          };
          editBtns.forEach((btn) => {
            btn.addEventListener('click', editCurrentPost);
          });

          const countingLikesOfPost = async (e) => {
            console.log(e.currentTarget.dataset.id);
            const idLikeBtn = e.currentTarget.dataset.id;
            const postDoc = await getPost(idLikeBtn);
            const likesOfPost = postDoc.data().likes;
            console.log(likesOfPost);
            const idUser = postDoc.data().userId;
            console.log(likesOfPost.concat(idUser));

            if (likesOfPost.includes(idUser)) {
              const compareIdLikesUsers = likesOfPost.filter((idLike) => idLike !== idUser);
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
      console.log(getCurrentUser());
      createPost({ content: userPost.value, userId: getCurrentUser().uid, likes: [] })
        .then((docRef) => {
          // eslint-disable-next-line no-console
          console.log(docRef);
          postContainer.reset();
        })
        // eslint-disable-next-line no-console
        .catch((e) => {
          console.log(e);
        });
    } else {
      msg.textContent = 'Por favor, escribe un comentario';
      msg.classList.add('errorMessage');
    }
  });
};
