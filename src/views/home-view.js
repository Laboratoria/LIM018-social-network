import {
  getPosts,
  createPost,
} from '../firebase/post.js';

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
        <div class='content create-post'>
          <button type='button' class='buttonPost xBut'>x</button> 
          <div class='user-post' id='post-container'>
            <div class='userImage'>
              <img src='./images/user-profile-female.png' class='icon-profile'>
            </div>
            <textarea placeholder='¿Tienes alguna recomendación...?' name='userPost' id='userPost' class='area-post'></textarea>
          </div>
          <p id='msg'></p>
          <button type='button' id='buttonPost' class='buttonPost'>Publicar</button> 
        </div>
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
  const publications = document.querySelector('#publications');
  const msg = document.querySelector('#msg');

  getPosts()
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log(result);
      const posts = [];
      result.forEach((postDoc) => posts.push({ id: postDoc.id, ...postDoc.data() }));
      posts.forEach((item) => {
        console.log(item.id);
        const obtainPost = item.content;
        const content = document.createElement('div');
        content.setAttribute('class', 'content');
        const divPubl = document.createElement('div');
        divPubl.setAttribute('class', 'user-post');
        divPubl.textContent = obtainPost;
        content.appendChild(divPubl);
        publications.appendChild(content);
      });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  buttonPost.addEventListener('click', () => {
    // evaluar lo que ingreso el usuario
    if (userPost.value !== '') {
      msg.classList.remove('errorMessage');
      msg.textContent = '';
      createPost(userPost.value)
        .then((docRef) => {
          // eslint-disable-next-line no-console
          console.log(docRef);
          // getPost(docRef.id).then((postRef) => {
          //   const post = postRef.data().content;
          //   const content = document.createElement('div');
          //   content.setAttribute('class', 'content');
          //   const divCreateContent = document.createElement('div');
          //   divCreateContent.setAttribute('class', 'user-post');
          //   divCreateContent.textContent = post;
          //   content.appendChild(divCreateContent);
          //   publications.appendChild(content);
          // });
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    } else {
      msg.textContent = 'Por favor, escribe un comentario';
      msg.classList.add('errorMessage');
    }
  });
};
