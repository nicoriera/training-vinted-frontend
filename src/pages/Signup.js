import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = (props) => {
  const { handleLogin } = props;
  const history = useHistory();
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [revealPassword, setRevealPassword] = useState("");

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrorMessage("");
  };

  const handleClickRevealPassword = () => {
    setRevealPassword(!revealPassword);
  };

  const handleChangePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:5000/user/signup", {
        email: email,
        password: password,
        phone: phone,
        username: username,
      });
      if (response.data.token) {
        handleLogin(response.data.token);
        history.push("/");
      } else {
        alert("une erreur est survenue veuillez ressayer");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
    }
  };

  return (
    <div>
      <div className="container-signup">
        <div className="block-signup">
          <h2>S'inscrire</h2>
          <>
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={handleChangeUsername}
                placeholder="Nom d'utilisateur"
              />

              <input
                className={errorMessage ? "field-error" : ""}
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Email"
              />

              <input
                type="phone"
                value={phone}
                onChange={handleChangePhone}
                placeholder="+33612345678"
              />
              {revealPassword ? (
                <FontAwesomeIcon
                  onClick={handleClickRevealPassword}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={handleClickRevealPassword}
                  icon={faEye}
                />
              )}

              <input
                type={revealPassword ? "text" : "password"}
                value={password}
                onChange={handleChangePassword}
                placeholder="Mot de passe"
              />

              <div className="block-checkbox">
                <div>
                  <input type="checkbox" />
                  <span>S'incrire à notre newsletter</span>
                </div>

                <p>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </p>
              </div>

              <button className="button-signup" type="submit">
                S'incrire
              </button>
            </form>
          </>

          <Link className="link-signup" to="user/login">
            Tu as déjà un compte ? Connecte-toi!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
