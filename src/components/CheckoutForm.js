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
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);

      const response = await axios.post(
        "https://vinted-backend-nicolas.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          amount: totalPrice,
          title: productName,
        }
      );

      if (response.data) {
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
          <button
            className="button-pay"
            type="submit"
            disabled={!stripe || !elements}
          >
            Pay
          </button>
        </form>
      ) : (
        <div className="checkoutform-validate">Merci pour votre achat</div>
      )}
    </div>
  );
};

export default CheckoutForm;
