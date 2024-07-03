import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Add, Remove } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Grid,
  Card,
  Stack,
  Rating,
  Button,
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
        display: 'block',
        background: 'red',
        width: '24px',
        height: '24px',
        color: 'white',
        fontSize: '24px',
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
      <Grid item container spacing={2} mt={15}>
        <Grid item xs={6} md={5} ml={12}>
          <Typography variant="h1" gutterBottom>
            {convertedProductName}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Box display="flex" alignItems="center" mb={1}>
              <Rating
                name="rating"
                value={4.3}
                precision={0.5}
                readOnly
                sx={{ fontSize: '20px' }}
              />
            </Box>
            <Typography variant="h5" gutterBottom>
              ${price}
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
                1
              </Button>
              <Button
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
                <Box key={index} px={2}>
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
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892494/cat-5_nz38j1.png"
            alt=""
            style={{ objectFit: 'cover', width: '60%' }}
          />
        </Grid>
      </Grid>
      <Typography variant="body1">Quantity in Stock: {quantityInStock}</Typography>
      <Typography variant="body1">Manufacture Date: {manufactureDate}</Typography>
      <Typography variant="body1">Expiry Date: {expiryDate}</Typography>
      <Typography variant="body1">Unit of Measure: {unitOfMeasure}</Typography>
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
    unitOfMeasure: PropTypes.string,
    nutrients: PropTypes.arrayOf(PropTypes.any),
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        productImageId: PropTypes.number,
        imageUrl: PropTypes.string,
      })
    ),
  }),
};

export default ProductDetail;
