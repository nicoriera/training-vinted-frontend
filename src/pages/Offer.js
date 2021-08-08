import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Loader from "react-loader-spinner";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );

      setData(response.data);
      setIsLoading(false);
    };

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
        <div className="offer-container">
          <div className="offer">
            <div>
              <img
                src={data.product_image.secure_url}
                alt="product_image.secure_url"
              />
            </div>
            <div className="offer-text">
              <div className="offer-text-price">
                {Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(data.product_price)}
              </div>
              <div className="offer-text-name">{data.product_name}</div>

              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <p key={index}>
                    {keys[0]} : {elem[keys[0]]}
                  </p>
                );
              })}

              <div>{data.product_description}</div>
              <div>{data.owner.account.username}</div>

              <Link to="/payement">
                <button>Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
