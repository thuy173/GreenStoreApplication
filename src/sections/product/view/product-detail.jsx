import Slider from 'react-slick';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  Divider,
  CardMedia,
  Typography,
  ButtonGroup,
} from '@mui/material';

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
        background: 'red',
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

  const {
    productName,
    price,
    quantityInStock,
    description,
    manufactureDate,
    expiryDate,
    unitOfMeasure,
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

  return (
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
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              Buy now
            </Button>
          </Stack>
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
      <Grid item xs={12} md={12} mt={5}>
        <Divider sx={{ width: '100%', marginBottom: '4%' }}>
          <Chip label="Description" size="small" />
        </Divider>
        <Grid item xs={12} md={12} px={50}>
          <Typography variant="body1">Quantity in Stock: {quantityInStock}</Typography>
          <Typography variant="body1">Manufacture Date: {manufactureDate}</Typography>
          <Typography variant="body1">Expiry Date: {expiryDate}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} mt={5}>
        <Divider sx={{ width: '100%', marginBottom: '4%' }}>
          <Chip label="Review" size="small" />
        </Divider>
        <Grid item xs={12} md={12} px={50}>
          <Typography variant="body1">Quantity in Stock: {quantityInStock}</Typography>
          <Typography variant="body1">Manufacture Date: {manufactureDate}</Typography>
          <Typography variant="body1">Expiry Date: {expiryDate}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

ProductDetail.propTypes = {
  initialValues: PropTypes.shape({
    productName: PropTypes.string,
    price: PropTypes.number,
    quantityInStock: PropTypes.number,
    description: PropTypes.string,
    manufactureDate: PropTypes.any,
    expiryDate: PropTypes.any,
    rating: PropTypes.number,
    unitOfMeasure: PropTypes.string,
    nutrients: PropTypes.arrayOf(PropTypes.any),
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        productImageId: PropTypes.number,
        imageUrl: PropTypes.string,
      })
    ),
    ratingList: PropTypes.arrayOf(
      PropTypes.shape({
        ratingId: PropTypes.number,
        ratingValue: PropTypes.any,
        createAt: PropTypes.any,
      })
    ),
  }),
};

export default ProductDetail;
