import {
    savebdPost, onGetTasks, auth, signOut,
  } from '../firebase/firebase.js';
  /*
  function getPost(pBodyContainer) {
    onGetTasks((querySnapshot) => {
      let viewposts = '';
      querySnapshot.forEach((doc) => {
        const bdmuro = doc.data();
  
        viewposts += `<div class="postsContainerDiv">
          <div class="headerPostContainer">
             <div class="userPostContainer">
                <img class=" postUsePhoto">
                <p class="postUserName">${bdmuro.userName}</p>
             </div>
             <div class="iconsEditDeletePostContainer">
                <i class="fa-solid fa-pencil"></i>
                <i class="fa-solid fa-trash-can"></i>
             </div>
          </div>
          <div class="post">
                <div class="postTextDiv ">
                    <div class="posttext "> ${bdmuro.postDescription}</div>
                </div>
                <div class="postIcon ">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-regular fa-comment-dots"></i>
                </div>
                <div class="postCommentsDiv ">
                    <div class="postComments"> postComments</div>
               </div>
          </div>
        </div>
        `;
      });
      pBodyContainer.innerHTML = viewposts;
    });
  }
  export function sendNewPost(uId, userName, postDescription) {
    const currentUser = auth.currentUser;
    
    savebdPost(currentUser.uid, currentUser.displayName);
    console.log('aqui');
    // console.log(savebdPost);
    
  }*/
  
  
  
  export function showPostFunt(containerMuro) {
    const postBodyContainer = containerMuro.querySelector('.postBodyContainer');
    // const xc = containerMuro.querySelector('.postBodyContainer');
    console.log( postBodyContainer);
   // getPost(postBodyContainer);
  }
  