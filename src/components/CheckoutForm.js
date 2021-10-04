import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (props) => {
  const { totalPrice, productName } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Nicolas",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken,
          amount: totalPrice,
          title: productName,
        }
      );

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      alert("Une erreur est survenue, veuillez réssayer");
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
        <div>Votre payement est validé</div>
      )}
    </div>
  );
};

export default CheckoutForm;
