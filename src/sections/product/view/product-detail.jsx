import Cookies from 'js-cookie';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from 'react';

import { Add, Remove } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Grid,
  Card,
  Chip,
  Stack,
  Rating,
  Button,
  Avatar,
  Divider,
  CardMedia,
  Typography,
  ButtonGroup,
} from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import CartServices from 'src/services/CartServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

function SampleNextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'green',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Next"
    />
  );
}

function SamplePrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'none' }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Previous"
    />
  );
}

const ProductDetail = ({ initialValues }) => {
  const [selectedImage, setSelectedImage] = useState(initialValues.productImages[0].imageUrl);
  const [quantity, setQuantity] = useState(1);
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

  const {
    productId,
    productName,
    price,
    quantityInStock,
    description,
    manufactureDate,
    expiryDate,
    unitOfMeasure,
    nutrients,
    ratingReviewList,
  } = initialValues;

  const convertedProductName = productName.replace(/\b\w/g, (char) => char.toUpperCase());
  const convertedDes = description.charAt(0).toUpperCase() + description.slice(1);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const getCartUuid = () => {
    const cartUuid = Cookies.get('CART_UUID');
    return cartUuid;
  };

  const userId = localStorage.getItem('uD');

  useEffect(() => {
    localStorage.setItem('cartItemCount', cartItemCount);
  }, [cartItemCount]);

  const handleAddCart = async (quantityItem) => {
    const customerIdOrUuid = userId || getCartUuid();

    if (!customerIdOrUuid) {
      showAlert('error', 'Unable to add to cart. Please try again later.');
      return;
    }

    const credentials = {
      productId,
      quantity: quantityItem,
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
    <>
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
        <Grid item container spacing={2} mt={6}>
          <Grid item xs={6} md={5} ml={12}>
            <Typography variant="h1" gutterBottom>
              {convertedProductName}
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <Box display="flex" alignItems="center" mb={1}>
                <Rating
                  name="rating"
                  value={initialValues?.rating || 5}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: '20px' }}
                />
              </Box>
              <Typography variant="h4" gutterBottom>
                ${price}{' '}
                <small style={{ fontSize: 14, fontWeight: 'normal' }}>per {unitOfMeasure}</small>
              </Typography>
            </Stack>
            <Typography mt={4} mb={3} variant="body1" gutterBottom>
              {convertedDes}
            </Typography>
            <Stack direction="row" spacing={2}>
              <ButtonGroup
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  boxShadow: 'none',
                  '& .MuiButtonGroup-grouped': {
                    borderColor: 'transparent',
                    '&:not(:last-of-type)': {
                      borderRight: 'none',
                    },
                    minWidth: 22,
                    padding: '3px 4px',
                  },
                }}
              >
                <Button
                  onClick={handleDecrement}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#26643b',
                    },
                  }}
                >
                  <Remove sx={{ fontSize: 16 }} />
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                    },
                  }}
                >
                  {quantity}
                </Button>
                <Button
                  onClick={handleIncrement}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#26643b',
                    },
                  }}
                >
                  <Add sx={{ fontSize: 16 }} />
                </Button>
              </ButtonGroup>
              <Button
                sx={{
                  backgroundColor: '#d6e5d8',
                  width: '150px',
                  color: '#26643b',
                  borderRadius: 1.4,
                  '&:hover': {
                    backgroundColor: '#26643b',
                    color: '#d6e5d8',
                  },
                }}
                disabled={quantityInStock === 0}
                onClick={() => handleAddCart(quantity)}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
              >
                Buy now
              </Button>
            </Stack>
            {quantityInStock === 0 && (
              <Typography variant="body1" color="error" mt={2}>
                Out of Stock
              </Typography>
            )}
            <Stack mt={5} ml={-2.5}>
              <Slider {...settings}>
                {initialValues.productImages.map((image, index) => (
                  <Box key={index} px={2} onClick={() => handleImageClick(image.imageUrl)}>
                    <Card>
                      <Box sx={{ height: 140 }}>
                        <CardMedia component="img" sx={{ height: '100%' }} image={image.imageUrl} />
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Slider>
            </Stack>
          </Grid>
          <Grid item xs={6} md={6}>
            <img
              src={selectedImage}
              alt=""
              style={{ objectFit: 'cover', width: '60%', marginBottom: '18%', marginLeft: '18%' }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack justifyContent="start">
        <Grid item xs={12} md={12} mt={5}>
          <Divider sx={{ width: '100%', marginBottom: '4%' }}>
            <Chip label="Description" size="small" />
          </Divider>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              pl: { xs: 6, sm: 8, md: 12 },
            }}
          >
            <Typography variant="body1">🥑 {description}</Typography>
            {nutrients && nutrients.length > 0 && (
              <>
                <Typography variant="subtitle2" mt={2}>
                  🍑 Nutrients:
                </Typography>
                <ul>
                  {nutrients.map((nutrient, index) => (
                    <li key={index}>
                      <Typography variant="body2">{nutrient.nutrientName}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {manufactureDate && (
              <Typography variant="body1">Manufacture Date: {manufactureDate}</Typography>
            )}
            {expiryDate && <Typography variant="body1">Expiry Date: {expiryDate}</Typography>}
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} mt={5}>
          <Divider sx={{ width: '100%', marginBottom: '4%' }}>
            <Chip label="Product reviews" size="small" />
          </Divider>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              pl: { xs: 6, sm: 8, md: 20 },
            }}
          >
            {ratingReviewList && ratingReviewList.length > 0 ? (
              ratingReviewList.map((item, index) => (
                <Stack key={index} direction="row" mb={3}>
                  <Avatar alt={item.author} src={item.avatar} sx={{ mr: 1.3, mt: 0.5 }} />
                  <Stack>
                    <Typography variant="body2" component="span">
                      <strong>{item.author}</strong>
                    </Typography>
                    <Rating
                      value={item.ratingValue}
                      precision={0.5}
                      readOnly
                      style={{ verticalAlign: 'middle', fontSize: 'large' }}
                    />
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      gutterBottom
                    >
                      {fDateTime(item.reviewTime)}
                    </Typography>
                    <Typography variant="body1">{item.reviewComment}</Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              <Typography variant="body1">No reviews available</Typography>
            )}
          </Grid>
        </Grid>
      </Stack>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

ProductDetail.propTypes = {
  initialValues: PropTypes.shape({
    productId: PropTypes.any,
    productName: PropTypes.string,
    price: PropTypes.number,
    quantityInStock: PropTypes.number,
    description: PropTypes.string,
    manufactureDate: PropTypes.any,
    expiryDate: PropTypes.any,
    rating: PropTypes.number,
    unitOfMeasure: PropTypes.string,
    nutrients: PropTypes.arrayOf(
      PropTypes.shape({
        nutrientName: PropTypes.string,
      })
    ),
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        productImageId: PropTypes.number,
        imageUrl: PropTypes.string,
      })
    ),
    ratingReviewList: PropTypes.arrayOf(
      PropTypes.shape({
        ratingValue: PropTypes.number,
        reviewComment: PropTypes.string,
        author: PropTypes.string,
        avatar: PropTypes.string,
        reviewTime: PropTypes.any,
      })
    ),
  }),
};

export default ProductDetail;
