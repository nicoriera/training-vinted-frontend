import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "Nicolas",
    });

    console.log(stripeResponse);

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        stripeToken: stripeResponse.token.id,
      }
    );

    console.log(response);

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div className="checkoutform">
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || !elements}>
            Pay
          </button>
        </form>
      ) : (
        <div>paiement ok</div>
      )}
    </div>
  );
};

export default CheckoutForm;
