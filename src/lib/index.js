import { getUser } from '../firebase/post.js';

const userInSession = () => JSON.parse(sessionStorage.getItem('USER'));

export const userInfoView = (templateElement) => {
  const userContainer = templateElement;
  return getUser(userInSession())
    .then((userRef) => {
      const userTemplate = `
        <div class='userInfo'>
        <div class='userImage'>
            <img src='${userRef.data().photo !== undefined ? userRef.data().photo : '../images/USUARIO-ICONO.png'}' class='icon-profile' referrerpolicy='no-referrer'>
        </div>
        <p>${userRef.data().name}</p>
        </div>
      `;
      userContainer.innerHTML = userTemplate;
    });
};
