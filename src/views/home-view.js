import { getPosts, createPost, getPost } from '../firebase/firebaseConfig.js';

export const createHomeView = () => {
  const viewHome = `
    <header class='header'>
      <nav class='navBar'>
        <ul>
           <li><a href='#/home'><img src='../images/LOGO-BLANCO.png' class='logo'></a></li>
        </ul>
        <input type='text' name='search' placeholder='Buscar...' class='search icon'></li>
        <ul class='interactions'>   
           <li><a href='#/user'><img src='../images/USUARIO-ICONO.png' class='icon'></a></li>
           <li><a href='#/like'>like</a></li>
           <li><a href='#/notifications'>notificaciones</a></li>
        </ul>
      </nav>
    </header>
    <section class='main'>
      <div class='containerInfo'>
        <div class='userInfo'>
          <div class='userImage'>
            <img src='../images/USUARIO-ICONO.png' class='icon'>
          </div>
          <p>USUARIO</p>
        </div>
      </div>  
      <div id='publications' class='publications'>
        <div class='content'>
          <button type='button' class='buttonPost xBut'>x</button> 
          <div class='thePost'>
            <div class='userPost'>
              <div class='userImage'>
                <img src='../images/USUARIO-ICONO.png' class='icon'>
              </div>
              <input type='text' id='userPost' class='inputPost' placeholder='¿Tienes alguna recomendación o receta que quieres compartir? Escríbelo aquí'>
            </div>
            <button type='button' id='buttonPost' class='buttonPost'>Publicar</button> 
          </div>
        </div>
      </div>
    </section>    
    <footer class='footer'>
       <h3>Todos los derechos reservados</h3>
    </footer>
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

  getPosts()
    .then((result) => {
      result.forEach((item) => {
        const obtainPost = item.contenido;
        const content = document.createElement('div');
        content.setAttribute('class', 'content');
        const divPubl = document.createElement('div');
        divPubl.setAttribute('class', 'userPost');
        divPubl.textContent = obtainPost;
        content.appendChild(divPubl);
        publications.appendChild(content);
      });
    }).catch((error) => {
      console.log(error);
    });

  buttonPost.addEventListener('click', () => {
    // evaluar lo que ingreso el usuario
    if (userPost.value !== '') {
      createPost(userPost.value)
        .then((docRef) => {
          getPost(docRef.id).then((postRef) => {
            const post = postRef.data().contenido;
            const content = document.createElement('div');
            content.setAttribute('class', 'content');
            const divCreateContent = document.createElement('div');
            divCreateContent.setAttribute('class', 'userPost');
            divCreateContent.textContent = post;
            content.appendChild(divCreateContent);
            publications.appendChild(content);
          });
        })
        .catch((e) => console.log(e));
    } else {
      alert('llena el campo');
    }
  });
};
