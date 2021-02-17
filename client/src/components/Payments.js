import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../actions";

const Payments = (props) => {
  const { handleToken } = props;

  return (
    <StripeCheckout
      name="Surveynator"
      description="5 survey credits"
      amount={500}
      token={(token) => {
        handleToken(token);
      }}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add credit</button>
    </StripeCheckout>
  );
};

export default connect(null, actions)(Payments);
