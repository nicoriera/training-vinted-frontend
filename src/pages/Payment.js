import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = (props) => {
  const location = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51JKNOPEgy7H75bHLIdHoOKqgUQ6DbxhSGCMPelhwWQSDii06T0mfXVI3UjKAgn6iJFR6hExKl2Azja2i6owoDmkR00djN9Fj72"
  );
  const { productName, price, totalPrice, shippingFees, protectionFees } =
    location.state;
  const { token } = props;

  return token ? (
    <div className="payement">
      <div className="container-payement">
        <div>Résumé de la commande</div>

        <div className="order-detail">
          <div>
            <div>Commande</div>
            <span>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(price)}
            </span>
          </div>
          <div>
            <div>Frais protection acheteurs</div>
            <div>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(protectionFees)}
            </div>
          </div>
          <div>
            <div>Frais de port</div>
            <div>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(shippingFees)}
            </div>
          </div>
        </div>
        <div>
          <div>TOTAL</div>
          <div>
            {Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(totalPrice)}
          </div>
        </div>

        <div>
          {`Il ne vous reste plus qu'une étape pour vous offrir ${productName}.
          Vous allez payer ${Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(totalPrice)} (frais de protection et frais de part
          inclus).`}
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm productName={productName} totalPrice={totalPrice} />
        </Elements>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Payment;
