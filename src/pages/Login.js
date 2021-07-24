import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    console.log(event.target.value);
  };

  return (
    <div className="container-login">
      <div className="block-login">
        <div>Se connecter</div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (password !== "token") {
              alert("Mauvais mots de passe");
            }
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
        </form>
      </div>
      <div button-login>
        <button type="submit">Se connecter</button>
        <p>Pas encore de compte ? Inscris-toi!</p>
      </div>
    </div>
  );
};

export default Login;
