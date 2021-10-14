import React from "react";
import Vintedlogo from "../assets/pictures/vinted-logo-771A7E0093-seeklogo.com.png";
import { Link, useLocation } from "react-router-dom";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortNumericDown,
  faSortNumericDownAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

// COMPONENT

import PriceRange from "../components/PriceRange";

const Header = (props) => {
  const {
    token,
    handleLogout,
    search,
    handleSearch,
    rangeValues,
    handleRange,
    handleFinalRange,
    sort,
    handleSort,
  } = props;

  const location = useLocation();

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
              <FontAwesomeIcon icon={faSearch} className="icon-loop" />
            </div>

            {location.pathname === "/" ? (
              <div className="filter-slider">
                <div className="toggle-price">
                  <span>Trier par pix :</span>

                  <Toggle
                    className="toggle"
                    defaultChecked={sort}
                    icons={{
                      checked: (
                        <FontAwesomeIcon
                          icon={faSortNumericDown}
                          color="white"
                        />
                      ),
                      unchecked: (
                        <FontAwesomeIcon
                          icon={faSortNumericDownAlt}
                          color="white"
                        />
                      ),
                    }}
                    onChange={handleSort}
                  />
                </div>
                <PriceRange
                  rangeValues={rangeValues}
                  handleRange={handleRange}
                  handleFinalRange={handleFinalRange}
                />
              </div>
            ) : null}
          </div>

          <div className="header-button">
            <div className="button-connexion">
              {token ? (
                <div>
                  <Link to="/publish">
                    <button className="button-green">Vends tes articles</button>
                  </Link>
                  <button className="button-red" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <Link to="/publish">
                    <button className="button-green">Vends tes articles</button>
                  </Link>
                  <Link to="/signup">
                    <button className="button-green">S'inscrire</button>
                  </Link>
                  <Link to="/login">
                    <button className="button-green">Se connecter</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
