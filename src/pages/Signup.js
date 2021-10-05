import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Signup = (props) => {
  const { handleLogin } = props;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
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
    if (!email) {
      setEmailError("email is mandatory");
    }

    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:5000/user/signup", {
        email: email,
        password: password,
        username: username,
        phone: phone,
      });
      if (response.data.token) {
        handleLogin(response.data.token);
        history.push("/offers?onboarding=true");
      } else {
        alert("une erreur est survenue veuillez ressayer");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        alert(error.response.data.message);
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
                className={emailError ? "field-error" : ""}
                type="text"
                value={username}
                onChange={handleChangeUsername}
                placeholder="Nom d'utilisateur"
              />
              {emailError && <div>email is mandatory</div>}
              <br />
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Email"
              />
              <br />
              <input
                type="phone"
                value={phone}
                onChange={handleChangePhone}
                placeholder="+33612345678"
              />
              <br />
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Mot de passe"
              />
              <br />
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
              <br />
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
