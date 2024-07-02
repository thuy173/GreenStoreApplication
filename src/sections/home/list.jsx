import React, { useState, useEffect } from 'react';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {
  Box,
  Card,
  Grid,
  Rating,
  CardMedia,
  IconButton,
  Typography,
  CardContent,
} from '@mui/material';

import ProductServices from 'src/services/ProductServices';

// ----------------------------------------------------------------------

export default function ListMenu() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await ProductServices.getData();
      if (response?.data && response?.status === 200) {
        setProductData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <Grid container spacing={3} p={12}>
      {productData.map((items, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            sx={{
              position: 'relative',
              '&:hover': {
                '& $cardOverlay': {
                  opacity: 0.5,
                },
                '& img': {
                  transform: 'scale(1.08)',
                },
              },
            }}
          >
            <Card
              sx={{
                position: 'relative',
                maxWidth: 325,
                width: 345,
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 250, 0.5)',
                overflow: 'hidden',
                '@media (max-width: 1508px)': {
                  width: 260,
                },
              }}
            >
              <CardMedia
                component="img"
                height="248"
                image={
                  items.productImages[0]?.imageUrl ||
                  'https://res.cloudinary.com/dmmk9racr/image/upload/v1719892453/cat-1_q49n2j.png'
                }
                sx={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '@media (max-width: 1508px)': {
                    height: '200px',
                  },
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {items.productName}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  ${items.price}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating
                    name="rating"
                    value={items.rating || 4.3}
                    precision={0.5}
                    readOnly
                    sx={{ fontSize: '20px' }}
                  />
                </Box>
              </CardContent>
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'linear-gradient(135deg, #ff8a65, #ff7043)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                New
              </Box>
            </Card>
            {hoveredIndex === index && (
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: '6.5%',
                  right: '25%',
                  width: 38,
                  height: 38,
                  bgcolor: 'action.selected',
                  zIndex: 1,
                  '@media (max-width: 1508px)': {
                    bottom: '8%',
                    right: '4%',
                  },
                }}
              >
                <ShoppingCartCheckoutIcon />
              </IconButton>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
