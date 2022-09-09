export function registerUser(email, password) {
  if (email === 'arkelly.perez.alayo@gmail.com' && password === '123456') {
    return Promise.resolve({
      user: {
        uid: 'abc123',
        username: 'arkelly perez alayo',
        photoURL: '',
      },
    });
  }

  return Promise.reject(new Error());
}
export function signEmail(email, password) {
  if (email === 'arkelly.perez.alayo@gmail.com' && password === '123456') {
    return Promise.resolve({
      user: {
        uid: 'abc123',
        username: 'arkelly perez alayo',
        photoURL: '',
      },
    });
  }

  return Promise.reject(new Error());
}

// export function signEmail(email, password) {
//   if (email === 'arkelly.perez.alayo@gmail.com' && password === '123456') {
//     return Promise.resolve({
//       user: {
//         uid: 'abc123',
//         username: 'arkelly perez alayo',
//         photoURL: '',
//       },
//     });
//   }

//   return Promise.reject(new Error());
// }

export const signGoogle = jest.fn(() => Promise.resolve({ user: 'arkelly perez alayo', photoURL: '' }));

export const signFacebook = jest.fn(() => Promise.resolve({ user: 'arkelly perez alayo', photoURL: '' }));

export const update = jest.fn();

export const set = jest.fn();

export const ref = jest.fn();

export const database = {};

export const onGetPosts = jest.fn();

export const provider = jest.fn();

export const providerf = jest.fn();

export const userCollection = jest.fn();

// export const userCollection = jest.fn();
// ........................muro...........................

// export const signUpWithEmail = jest.fn();

// export const doc = jest.fn();
// export const login = jest.fn();
// export const logOut = jest.fn();
/*
export function onGetTasks(callback) {
  callback([{
    uId: 'abc123',
    userName: 'arkelly perez alayo',
    postDescription: 'holi',
  },
  {
    uId: 'abc124',
    userName: 'Yadira Garvel',
    postDescription: 'gatito',
  }]);
}

// export const bdmuro= jest.fn();
/*
export const data = function () {
  return {
    id: '', name: '', postDescription: '', userName: '',
  };
};

export const dbdmuro = [{
  doc: {
    data: {
      id: '4nt8dM97lr9AofyQrJpG',
      postDescription: 'lmkkm',
      userName: 'arkelly perez alayo',
    },
  },
}];
x
export const callPost = (querySnapshot) => querySnapshot([
  {
    data: () => ({
      uId: '4nt8dM97lr9AofyQrJpG',
      postDescription: 'lmkkm',
      userName: 'arkelly perez alayo',

    }),

  }]); */
