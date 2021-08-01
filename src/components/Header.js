import React from "react";
import Vintedlogo from "../assets/pictures/vinted-logo-771A7E0093-seeklogo.com.png";
import Iconlopp from "../assets/pictures/icon_loop.png";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import Toggle from "../components/Toggle";

const Header = (props) => {
  const { token, handleLogout, search, handleSearch } = props;

  return (
    <nav>
      <div className="header">
        <div className="header-content">
          <Link to="/">
            <img className="header-picture" src={Vintedlogo} alt="vintedlogo" />
          </Link>
          <div className="filters">
            <div className="input-search">
              <input
                type="search"
                placeholder="Recherche des articles"
                value={search}
                onChange={handleSearch}
              />
              <img className="icon-loop" src={Iconlopp} alt="iconloop" />
            </div>
            <div className="filter-slider">
              <span>Trier par pix :</span>
              <Toggle />
              <span>Prix entre : </span>
              <Slider />
            </div>
          </div>

          <div className="header-button">
            <div className="button-connexion">
              {token ? (
                <div>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div>
                  <Link to="/signup">
                    <button>S'incrire</button>
                  </Link>
                  <Link to="/login">
                    <button>Se connecter</button>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/publish">
              <button className="button-sale">Vends tes articles</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
