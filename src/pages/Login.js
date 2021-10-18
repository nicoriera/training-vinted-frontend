import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

const Login = (props) => {
  const { handleLogin } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const fromPublish = location.state?.fromPublish ? true : null;

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrorMessage("");
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://vinted-backend-nicolas.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        handleLogin(response.data.token);
        setIsLoading(false);
        return history.push(fromPublish ? "/publish" : "/");
      } else {
        alert("Une erreur est survenue, veuillez ressayer");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
        setIsLoading(false);
      }
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="container-login">
        <div className="block-login">
          <h2>Se connecter</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={handleChangeEmail}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handleChangePassword}
            />
            <span className="error-message">{errorMessage}</span>
            {!isLoading ? (
              <Loader type="Puff" color="#2CB1BA" height={40} width={40} />
            ) : (
              <button className="button-login" type="submit">
                Se connecter
              </button>
            )}
          </form>
        </div>

        <Link className="link-signup" to="/signup">
          Pas encore de compte ? Inscris-toi!
        </Link>
      </div>
    </div>
  );
};

export default Login;
