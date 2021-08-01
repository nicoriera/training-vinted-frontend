import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Publish = (props) => {
  const { token } = props;
  const [file, setFile] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", file);

    const response = await axios.post(
      "http://localhost:3000/offer/publish",
      formData
    );

    console.log(token);
    console.log(response.data);
  };

  return token ? (
    <div className="publish-form">
      <span>Vends tes articles</span>
      <form className="publish-form" onChange={handleSubmit} action="">
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <input type="text" placeholder="text" />
        <textarea />
        <input type="text" placeholder="text" />
        <input type="text" placeholder="text" />
        <input type="text" placeholder="text" />
        <input type="text" placeholder="text" />
        <input type="text" placeholder="text" />
        <input type="text" placeholder="text" />
        <input type="text" placeholder="text" />
        <button>Submit</button>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
