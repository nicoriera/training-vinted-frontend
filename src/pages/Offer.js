import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Loader from "react-loader-spinner";

const Offer = () => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // states for payement send with useHistory
  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/offer/${id}`);

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
            {/* <div className="offer-picture">
              <img
                src={data.product_image.secure_url}
                alt="product_image.secure_url"
              />
            </div> */}
            <div className="offer-text">
              <div className="offer-text-price">
                {Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(data.product_price)}
              </div>
              <div className="offer-text-name">{data.product_name}</div>
              <div className="offer-text-description">
                {data.product_details.map((elem, index) => {
                  const keys = Object.keys(elem);
                  return (
                    <span key={index}>
                      <span>{keys[0]}</span> <span>{elem[keys[0]]}</span>
                    </span>
                  );
                })}
              </div>

              <div>{data.product_description}</div>
              <div>{data.owner.account.username}</div>

              <button
                onClick={() => {
                  history.push({
                    pathname: "/payment",
                    state: {
                      productName: data.product_name,
                      totalPrice: total,
                      protectionFees: protectionFees,
                      shippingFees: shippingFees,
                      price: data.product_price,
                    },
                  });
                }}
              >
                Acheter
              </button>

              {/* utiliser history.push pour partager des infos a une autre page */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
