import React from "react";
import { Redirect } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKNOPEgy7H75bHLIdHoOKqgUQ6DbxhSGCMPelhwWQSDii06T0mfXVI3UjKAgn6iJFR6hExKl2Azja2i6owoDmkR00djN9Fj72"
);

const Payement = (props) => {
  const { token } = props;
  return token ? (
    <div className="payement">
      <div className="container-payement">
        <div>Résumé de la commande</div>

        <div className="order-detail">
          <div>
            <div>Commande</div>
            <span>3,95€</span>
          </div>
          <div>
            <div>Frais protection acheteurs</div>
            <div>0,40€</div>
          </div>
          <div>
            <div>Frais de port</div>
            <div>0,80€</div>
          </div>
        </div>
        <div>TOTAL</div>
        <div>
          Il ne vous reste plus qu'une étape pour vous ofrrir Zara Pull. Vous
          allez payer 5,15€ (frais de protection et frais de part inclus).
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Payement;
