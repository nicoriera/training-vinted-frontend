import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loader from "react-loader-spinner";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
    );

    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
        <div>
          <div>{data.product_name}</div>
          <img
            src={data.product_image.secure_url}
            alt="product_image.secure_url"
          />
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return <p>{keys[0]}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default Offer;
