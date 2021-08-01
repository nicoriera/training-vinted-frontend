import React from "react";
import Vintedlogo from "../assets/pictures/vinted-logo-771A7E0093-seeklogo.com.png";
import Iconlopp from "../assets/pictures/icon_loop.png";
import { Link } from "react-router-dom";
import { Range } from "react-range";
import Toggle from "react-toggle";

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
              <Toggle
                defaultChecked={sort}
                icons={{
                  checked: <div>🔼</div>,
                  unchecked: <div>🔽</div>,
                }}
                onChange={handleSort}
              />
              <span>Prix entre : </span>
              <Range
                step={5}
                min={0}
                max={500}
                values={rangeValues}
                onChange={(values) => handleRange(values)}
                onFinalChange={(values) => handleFinalRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "10px",
                      width: "10px",
                      backgroundColor: "#999",
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="header-button">
            <div className="button-connexion">
              {token ? (
                <div>
                  <Link to="/publish">
                    <button className="button-sale">Vends tes articles</button>
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div>
                  <Link to="/publish">
                    <button className="button-sale">Vends tes articles</button>
                  </Link>
                  <Link to="/signup">
                    <button>S'incrire</button>
                  </Link>
                  <Link to="/login">
                    <button>Se connecter</button>
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
