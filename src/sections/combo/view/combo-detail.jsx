import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Card, Button, Container, CardMedia, Typography, CardContent } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Delicious Recipes and Diet Workout',
    description: "Anna Marta's core philosophy...",
    price: '14,69$',
    image: '/path/to/image1.jpg',
  },
  {
    id: 2,
    name: 'Pesto',
    description: 'Pesto: beloved for its rich flavor...',
    price: '28,50$',
    image: '/path/to/image2.jpg',
  },
  {
    id: 3,
    name: 'Salsa',
    description: 'Salsa: a vibrant medley of tomatoes...',
    price: '14,49$',
    image: '/path/to/image3.jpg',
  },
  {
    id: 4,
    name: 'Oyster',
    description: 'Oysters, prized delicacies of the sea...',
    price: 'Out of stock',
    image: '/path/to/image4.jpg',
  },
  {
    id: 5,
    name: 'Tartar',
    description: 'Tartar sauce, a tangy companion...',
    price: '12,49$',
    image: '/path/to/image5.jpg',
  },
];

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

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Delicious Recipes and Diet Workout
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Anna philosophy emphasizes colorful, beautiful, and delicious food.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Explore Products
      </Button>
      <CircularContainer>
        <Slider {...settings}>
          {products.map((product) => (
            <CircularCard key={product.id}>
              <CardMedia component="img" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {product.description}
                </Typography>
                <Typography variant="h6" component="p" sx={{ mt: 2 }}>
                  {product.price}
                </Typography>
              </CardContent>
            </CircularCard>
          ))}
        </Slider>
      </CircularContainer>
    </Container>
  );
};

export default ComboDetail;
