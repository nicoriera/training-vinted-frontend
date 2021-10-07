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
        <h3>Résumé de la commande</h3>

        <div className="order-detail">
          <div>
            <div className="order-detail-text">Commande</div>
            <span>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(price)}
            </span>
          </div>
          <div>
            <div className="order-detail-text">Frais protection acheteurs</div>
            <div>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(protectionFees)}
            </div>
          </div>
          <div>
            <div className="order-detail-text">Frais de port</div>
            <div>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(shippingFees)}
            </div>
          </div>

          <div>
            <div className="order-detail-text">TOTAL</div>
            <div>
              {Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(totalPrice)}
            </div>
          </div>
        </div>

        <div className="text-pay">
          Il ne vous reste plus qu'une étape pour vous offrir
          <span> {productName}</span>. Vous allez payer
          <span>
            {" "}
            {Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(totalPrice)}{" "}
          </span>
          (frais de protection et frais de part inclus).
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
