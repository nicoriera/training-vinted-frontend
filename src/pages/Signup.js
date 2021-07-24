import React from "react";

const Signup = () => {
  return (
    <div className="container-signup">
      <div className="block-signup">
        <div>S'inscrire</div>
        <form action="">
          <input type="text" placeholder="Nom d'utilisateur" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mot de passe" />
        </form>
        <div className="block-checkbox">
          <div>
            <input type="checkbox" />
            <span>S'incrire à notre newsletter</span>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <div button-signup>
          <button>S'incrire</button>
          <p>Tu as déjà un compte ? Connecte-toi!</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
