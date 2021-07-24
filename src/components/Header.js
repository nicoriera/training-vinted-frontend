import React from "react";
import Vintedlogo from "../assets/pictures/vinted-logo-771A7E0093-seeklogo.com.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/">
        <div className="header">
          <div className="header-content">
            <img className="header-picture" src={Vintedlogo} alt="vintedlogo" />
            <input type="search" placeholder="Recherche des articles" />

            <div className="header-button">
              <div className="button-connexion">
                <Link to="/signup">
                  <button>S'incrire</button>
                </Link>
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
              </div>

              <button className="button-sale">Vends tes articles</button>
            </div>
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default Header;
