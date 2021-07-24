import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/signup"
    );

    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#49afb7"
          height={80}
          width={80}
        />
      ) : (
        <div className="container-signup">
          <div className="block-signup">
            <div>S'inscrire</div>
            <form onSubmit={(event) => event.preventDefault()}>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Nom d'utilisateur"
              />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Mot de passe"
              />
            </form>
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
            <div button-signup>
              <button onClick={() => {}} type="submit">
                S'incrire
              </button>
              <p>Tu as déjà un compte ? Connecte-toi!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
