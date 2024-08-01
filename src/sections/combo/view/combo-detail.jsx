import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Card, Button, Container, CardMedia, Typography, CardContent } from '@mui/material';

const CircularContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: theme.spacing(5),
  '.slick-track': {
    display: 'flex',
    alignItems: 'center',
  },
  '.slick-slide': {
    transition: 'transform 0.5s ease-in-out',
    position: 'relative',
    zIndex: 1,
    transform: `rotate(${Math.random() * 15 - 5}deg) translate(${Math.random() * 25 - 10}px, ${
      Math.random() * 20 - 10
    }px) scale(0.8)`,
  },
  '.slick-center': {
    zIndex: 2,
    transform: 'rotate(0deg) scale(1) translateY(-20px)',
  },
}));

const CircularCard = styled(Card)(({ theme }) => ({
  width: '220px',
  height: '330px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
}));

const ComboDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { comboId, comboProducts, comboName, priceCombo } = location.state || {
    comboId: null,
    comboProducts: [],
    comboName: '',
    priceCombo: 0,
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (current, next) => {
      const slides = document.querySelectorAll('.slick-slide');
      slides.forEach((slide) => {
        slide.style.transform = `rotate(${Math.random() * 15 - 5}deg) translate(${
          Math.random() * 30 - 10
        }px, ${Math.random() * 25 - 10}px) scale(0.8)`;
      });
    },
  };

  const handDetail = (id) => {
    navigate(`/product/detail/${id}`);
  };

  const handleBuyNow = () => {
    const userId = localStorage.getItem('uD');
    navigate('/order', {
      state: {
        userId,
        comboId,
        priceCombo,
        items: comboProducts.flatMap((comboProduct) =>
          comboProduct.products.map((product) => ({
            ...product,
            quantity: comboProduct.quantity,
          }))
        ),
      },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Combo Detail for Combo ID: {comboId} | {comboName}
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Here are the products included in this combo:
      </Typography>
      <CircularContainer>
        <Slider {...settings}>
          {comboProducts.map((comboProduct, index) =>
            comboProduct.products.map((product) => (
              <CircularCard key={product.productId} onClick={() => handDetail(product.productId)}>
                <CardMedia
                  component="img"
                  image={product.productImages[0]?.imageUrl}
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" component="p" sx={{ mt: 2 }}>
                    {product.price} {product.unitOfMeasure}
                  </Typography>
                </CardContent>
              </CircularCard>
            ))
          )}
        </Slider>
      </CircularContainer>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleBuyNow}>
        Buy now
      </Button>
    </Container>
  );
};

export default ComboDetail;
