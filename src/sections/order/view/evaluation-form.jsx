import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Grid,
  Dialog,
  Button,
  Rating,
  Avatar,
  Divider,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import OrderServices from 'src/services/OrderServices';
import ProductServices from 'src/services/ProductServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

const EvaluationDialog = ({ open, onClose, orderId, productIds }) => {
  const customerId = localStorage.getItem('uD');
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const responses = await Promise.all(
          productIds.map((id) => ProductServices.getDataById(id))
        );
        const details = responses
          .filter((response) => response?.data && response?.status === 200)
          .map((response) => response.data);
        setProductDetails(details);

        const initialRatings = details.reduce((acc, product) => {
          acc[product.productId] = 5;
          return acc;
        }, {});
        setRatings(initialRatings);

        const initialComments = details.reduce((acc, product) => {
          acc[product.productId] = '';
          return acc;
        }, {});
        setComments(initialComments);
      } catch (error) {
        console.error(error);
      }
    };

    if (open) {
      fetchProductDetails();
    }
  }, [open, productIds]);

  const handleRatingChange = (productId, newValue) => {
    console.log(`Changing rating for product ${productId} to ${newValue}`);
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: newValue,
    }));
  };

  const handleCommentChange = (productId, newValue) => {
    console.log(`Changing comment for product ${productId} to ${newValue}`);

    setComments((prevComments) => ({
      ...prevComments,
      [productId]: newValue,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    console.log('Final ratings:', ratings);
  console.log('Final comments:', comments);
    try {
      const evaluations = productIds.map((productId) => ({
        ratingValue: ratings[productId],
        productId,
        customerId,
        orderId,
        content: comments[productId] || '',
      }));

      const requestData = { requests: evaluations };

      const response = await OrderServices.evaluationOrder(requestData);

      if (response.status !== 200) {
        setAlert({
          message: response?.response?.data?.message || 'An error occurred. Please check again!',
          severity: 'error',
          isOpen: true,
        });
        return;
      }

      onClose();
      showAlert('success', 'Evaluation successfully!');
    } catch (error) {
      console.error('Failed to add evaluation:', error);
      setAlert({
        message: error.message || 'An error occurred.',
        severity: 'error',
        isOpen: true,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Đánh Giá Sản Phẩm</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {productDetails.map((product) => (
            <div key={product.productId}>
              <Grid item xs={12} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar
                  variant="rounded"
                  src={
                    product.productImages.length > 0
                      ? product.productImages[0].imageUrl
                      : '/placeholder.png'
                  }
                  alt={product.productName}
                  sx={{ width: 90, height: 'auto', mr: 2, objectFit: 'fit' }}
                />
                <Box>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="body2">Price: ${product.price}</Typography>
                </Box>
              </Grid>
              <Grid sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Rating
                  name={`product-rating-${product.productId}`}
                  value={ratings[product.productId] || 5}
                  onChange={(event, newValue) => handleRatingChange(product.productId, newValue)}
                />
                <Typography ml={2}>{ratings[product.productId] === 5 ? 'Tuyệt vời' : ''}</Typography>
              </Grid>

              <TextField
                margin="dense"
                placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={comments[product.productId] || ''}
                onChange={(event) => handleCommentChange(product.productId, event.target.value)}
              />
              <Divider sx={{ my: 2 }} />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Hoàn Thành
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

EvaluationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  productIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default EvaluationDialog;
