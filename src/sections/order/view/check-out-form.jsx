/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';

import PaymentServices from 'src/services/PaymentServices';

const stripePromise = loadStripe(
  'pk_test_51PcjBSDqid2qJKjuZYhKs3NWehNhq6Rlh000wl0y5uqtPIGzm1TfAI3vpu9kiTDKpU6tYdcPwvtjWruXM0gzGmF300BP5dsOuy'
);

const StyledForm = styled.form`
  width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .StripeElement {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  p {
    color: red;
  }
`;

const CheckoutForm = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      console.error(stripeError);
      setError(stripeError.message);
    } else {
      setError(null);
      handlePayment(paymentMethod, amount);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <CardElement className="StripeElement" />
      {error && <p>{error}</p>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </StyledForm>
  );
};

CheckoutForm.propTypes = {
  handlePayment: PropTypes.func.isRequired,
};

const PaymentHandler = () => {
  const handlePayment = async (paymentMethod, amount) => {
    const paymentData = {
      paymentMethod: paymentMethod.id,
      amount: parseInt(amount, 10),
      currency: 'usd',
      status: 'pending',
      paymentIntentId: paymentMethod.id,
    };
    try {
      const response = await PaymentServices.addData(paymentData);

      if (response.ok) {
        console.log('Payment successful!');
      } else {
        console.error('Payment failed!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default PaymentHandler;
