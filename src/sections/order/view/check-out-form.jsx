/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { Elements, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';

import { Dialog, DialogContent } from '@mui/material';

import PaymentServices from 'src/services/PaymentServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';
import OrderSuccessDialog from 'src/components/dialog/order-success-dialog';

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

const CheckoutForm = ({ handlePayment, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      console.error(stripeError);
      setError(stripeError.message);
    } else {
      setError(null);
      handlePayment(orderId);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <CardElement className="StripeElement" />
      {error && <p>{error}</p>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </StyledForm>
  );
};

CheckoutForm.propTypes = {
  handlePayment: PropTypes.func,
  orderId: PropTypes.number,
};

const PaymentHandler = ({ open, onClose, orderId }) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handlePayment = async () => {
    try {
      const response = await PaymentServices.changeStatus(orderId);

      if (response && response.status === 200) {
        showAlert('success', 'Payment successful!');
        setOpenDialog(true);
        localStorage.setItem('choice', 'Purchase Order');
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        showAlert('error', 'Payment failed!');
      }
    } catch (error) {
      showAlert('error', 'Error processing payment:', error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            overflow: 'visible',
            paddingTop: '84px',
            borderRadius: '25px',
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePayment={handlePayment} orderId={orderId} />
          </Elements>
        </DialogContent>
      </Dialog>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      {openDialog && <OrderSuccessDialog open={openDialog} onClose={() => setOpenDialog(false)} />}
    </>
  );
};

PaymentHandler.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  orderId: PropTypes.number,
};

export default PaymentHandler;
