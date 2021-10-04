import React from "react";
import Vintedlogo from "../assets/pictures/vinted-logo-771A7E0093-seeklogo.com.png";
import { Link, useLocation } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortNumericDown,
  faSortNumericDownAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

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

                <div className="toggle-range">
                  <span>Prix entre : </span>

                  <Range
                    values={rangeValues}
                    step={5}
                    min={0}
                    max={500}
                    onChange={(values) => handleRange(values)}
                    onFinalChange={(values) => handleFinalRange(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values: rangeValues,
                              colors: ["#ccc", "#49afb7", "#ccc"],
                              min: 0,
                              max: 500,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ index, props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          outline: "none",
                          backgroundColor: "#FFF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "-25px",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "12px",
                            fontFamily:
                              "Arial,Helvetica Neue,Helvetica,sans-serif",
                            padding: "4px",
                            borderRadius: "4px",
                            backgroundColor: "#49afb7",
                          }}
                        >
                          {rangeValues[index] + "€"}
                        </div>
                      </div>
                    )}
                  />
                </div>
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
                    <button className="button-green">S'incrire</button>
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
