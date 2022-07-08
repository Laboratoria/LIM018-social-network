export default () => {
  const viewLogin = `
    <h1> THE SOCIAL FOOD </h1>
        <form>
        <input type="text" placeholder="Usuario" id="user">
        <br>
        <input type="password" placeholder="Contraseña" id="password" value="">
        <br>
        <input type="submit" id="submit" value="Log In">
    </form>
    <p>o</p>
    <h2>Log In with gmail</h2>
    <h3>Si no tienes cuenta, crea una <span><a href="#/sign-up">aquí</a></span></h3>`;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewLogin;

  return divElement;
};
