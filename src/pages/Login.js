import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

const Login = (props) => {
  const { handleLogin } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    console.log(event.target.value);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        handleLogin(response.data.token);
        return history.push("/offers");
      } else {
        alert("Une erreur est survenue, veuillez ressayer");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401 || error.response.status === 400) {
        alert("Mauvais email et/ou mot de passe");
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <div className="container-login">
          <div className="block-login">
            <h3>Se connecter</h3>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={handleChangeEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={handleChangePassword}
              />
              <br />
              <button className="button-login" type="submit">
                Se connecter
              </button>
            </form>
          </div>

          <Link className="link-signup" to="user/signup">
            Pas encore de compte ? Inscris-toi!
          </Link>
        </div>
      ) : (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#49afb7"
          height={80}
          width={80}
        />
      )}
    </div>
  );
};

export default Login;
