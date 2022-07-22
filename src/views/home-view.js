import { getPosts, createPost } from '../firebase/firebaseConfig.js';

export const createHomeView = () => {
  const viewHome = `
    <header class='header'>
      <nav>
        <ul>
           <li>Home</li>
           <li>usuario</li>
           <li>buscar</li>
           <li>me gusta</li>
           <li>Notificaciones</li>
        </ul>
      </nav>
    </header>
    <section class='main'>
        <div class='userInfo'>
            <h1>aquí se verá información de usuario</h1>
        </div>
        <div class='publications'>
            <div class='content'>
              <div>
                <div>
                  <div class='userImage'>
                    <img src='./images/USUARIO-ICONO.png' class='icon'>
                  </div>
                  <input type='text' id='userPost' placeholder='¿Tienes alguna recomendación o receta de quieres compartir? Escríbelo aquí'>
                </div>
                <button type='button' id='buttonPost'>Publicar</button>
                <button type='button'>x</button>  
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
  const content = document.querySelector('.content');
  const buttonPost = document.querySelector('#buttonPost');
  const userPost = document.querySelector('#userPost');

  getPosts()
    .then((result) => {
      console.log(result[0].contenido);
    }).catch((error) => {
      console.log(error);
    });

  buttonPost.addEventListener('click', () => {
    console.log(userPost.value);
    createPost(userPost.value)
      .then((result) => {
        console.log(result);
      })
      .catch();
  });
};
