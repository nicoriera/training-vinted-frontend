import React from "react";
import { Link } from "react-router-dom";
const Card = (props) => {
  const { data } = props;

  return (
    <Link
      to={`/offer/${data._id}`}
      key={data._id}
      style={{ textDecoration: "none" }}
      alert="Go to user profile !"
    >
      <div className="offers">
        <div className="offer-card">
          {data.owner && data.owner.account.avatar && (
            <img
              alt={data.product_name}
              src={data.owner.account.avatar.secure_url}
            />
          )}

          <div className="offer-card-username">
            {data.owner && data.owner.account.username}
          </div>
          <div className="offer-card-picture">
            <img src={data.product_image.secure_url} alt={data.title} />
          </div>

          <div className="offer-card-infos">
            <div>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(data.product_price)}
            </div>
            <div>{data.product_details[1].TAILLE}</div>
            <div>{data.product_details[0].MARQUE}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
