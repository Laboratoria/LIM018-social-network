export default () => {
  const viewSignup = `
    <h1> THE SOCIAL FOOD </h1>
      <form>
        <input type="text" placeholder="Usuario" id="user">
        <br>
        <input type="text" placeholder="Apellidos" id="lastName">
        <br>
        <input type="text" placeholder="Nombre de usuario" id="userName">
        <br>
        <input type="text" placeholder="Correo electrónico" id="email">
        <br>
        <input type="password" placeholder="Contraseña" id="password" value="">
        <br>
        <input type="submit" id="submit" value="Sign Up">
      </form>`;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewSignup;

  return divElement;
};
