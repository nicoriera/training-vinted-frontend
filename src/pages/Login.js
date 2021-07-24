import React from "react";

const Login = () => {
  return (
    <div className="container-login">
      <div className="block-login">
        <div>Se connecter</div>
        <form action="">
          <input type="text" placeholder="Adresse email" />
          <input type="text" placeholder="Mot de passe" />
        </form>
      </div>
      <div button-login>
        <button>Se connecter</button>
        <p>Pas encore de compte ? Inscris-toi!</p>
      </div>
    </div>
  );
};

export default Login;
