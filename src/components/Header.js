import React from "react";
import Vintedlogo from "../assets/pictures/vinted-logo-771A7E0093-seeklogo.com.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <img className="header-picture" src={Vintedlogo} alt="vintedlogo" />
        <input type="search" placeholder="Recherche des articles" />

        <div className="header-button">
          <div className="button-connexion">
            <button>S'incrire</button>
            <button>Se connecter</button>
          </div>

          <button className="button-sale">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
