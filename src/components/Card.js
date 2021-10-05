import React from "react";
import { Link } from "react-router-dom";
const Card = (props) => {
  const { offers } = props;
  return (
    <div className="offers">
      {offers.map((offer, index) => {
        return (
          <Link
            to={`/offer/${offer._id}`}
            key={offer._id}
            style={{ textDecoration: "none" }}
            alert="Go to user profile !"
          >
            <div className="offer-card">
              {offer.owner && offer.owner.account.avatar && (
                <img
                  alt={offer.product_name}
                  src={offer.owner.account.avatar.secure_url}
                />
              )}

              <div className="offer-card-username">
                {offer.owner && offer.owner.account.username}
              </div>
              <div className="offer-card-picture">
                <div>
                  <img
                    // src={offer.product_image.secure_url}
                    alt={offer.title}
                  />
                </div>
              </div>

              <div className="offer-card-infos">
                <div>
                  {Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(offer.product_price)}
                </div>
                <div>{offer.product_details[1].TAILLE}</div>
                <div>{offer.product_details[0].MARQUE}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;
