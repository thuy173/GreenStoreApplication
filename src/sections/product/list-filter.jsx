import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import CartServices from 'src/services/CartServices';

import ProductCard from 'src/components/card/product-card';
import CustomSnackbar from 'src/components/snackbar/snackbar';

export default function ProductListFilter({ productFilterData }) {
  const currentDate = new Date();
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [cartItemCount, setCartItemCount] = useState(() => {
    const storedCount = parseInt(localStorage.getItem('cartItemCount'), 10);
    return !Number.isNaN(storedCount) ? storedCount : 0;
  });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const getCartUuid = () => {
    const cartUuid = Cookies.get('CART_UUID');
    return cartUuid;
  };

  const userId = localStorage.getItem('uD');

  useEffect(() => {
    localStorage.setItem('cartItemCount', cartItemCount);
  }, [cartItemCount]);

  const handleAddCart = async (productId) => {
    const customerIdOrUuid = userId || getCartUuid();

    if (!customerIdOrUuid) {
      showAlert('error', 'Unable to add to cart. Please try again later.');
      return;
    }

    const credentials = {
      productId,
      quantity: 1,
    };
    try {
      const response = await CartServices.addToCart(customerIdOrUuid, credentials);
      if (response && response.status === 200) {
        showAlert('success', 'Add product to cart success.');
        setCartItemCount((prevCount) => prevCount + 1);
      } else {
        setAlert({
          message:
            response?.response?.data?.message || 'An error occurred. Please try again later!',
          severity: 'error',
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Failed to cart:', error);
      setAlert({
        message: error.message || 'An error occurred!',
        severity: 'error',
        isOpen: true,
      });
    }
  };

  return (
    <Grid container spacing={2} p={3}>
      {productFilterData.map((items, index) => (
        <Grid item xs={12} sm={8} md={6} lg={4} key={index}>
          <ProductCard product={items} currentDate={currentDate} handleAddCart={handleAddCart} />
        </Grid>
      ))}
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Grid>
  );
}

ProductListFilter.propTypes = {
  productFilterData: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      createAt: PropTypes.any,
      unitOfMeasure: PropTypes.string,
      productImages: PropTypes.arrayOf(
        PropTypes.shape({
          imageUrl: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};
