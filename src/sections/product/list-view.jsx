import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

import { Grid, Pagination } from '@mui/material';

import CartServices from 'src/services/CartServices';
import ProductServices from 'src/services/ProductServices';

import ProductCard from 'src/components/card/product-card';
import CustomSnackbar from 'src/components/snackbar/snackbar';

export default function ProductList() {
  const currentDate = new Date();
  const [productData, setProductData] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [cartItemCount, setCartItemCount] = useState(() => {
    const storedCount = parseInt(localStorage.getItem('cartItemCount'), 10);
    return !Number.isNaN(storedCount) ? storedCount : 0;
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchProductData = async () => {
    try {
      const response = await ProductServices.getData(page - 1, pageSize);
      setProductData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData(page, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Grid container spacing={2} p={3}>
        {productData.map((product, index) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={index}>
            <ProductCard
              product={product}
              currentDate={currentDate}
              handleAddCart={handleAddCart}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="success"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </div>
  );
}
