import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Card, Grid, Stack, Button, Typography, CardContent } from '@mui/material';

import CartServices from 'src/services/CartServices';
import ProductServices from 'src/services/ProductServices';

import Link from 'src/components/link';
import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function ProductList() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };
  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
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

  const getCartUuid = () => {
    const cartUuid = Cookies.get('CART_UUID');
    return cartUuid;
  };

  const userId = localStorage.getItem('uD');

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
        navigate('/cart');
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

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <Grid container spacing={2} p={3}>
      {productData.map((items, index) => (
        <Grid item xs={12} sm={8} md={6} lg={4} key={index}>
          <Box
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
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: '30%',
                backgroundColor: '#507c5c',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '0 16px 0 16px',
                fontWeight: 'bold',
                zIndex: 1,
                '@media (max-width: 1508px)': {
                  right: '12%',
                },
                '@media (max-width: 767px)': {
                  right: '40%',
                },
                '@media (max-width: 991px)': {
                  right: '25%',
                },
              }}
            >
              -10%
            </Box>

            <Card
              sx={{
                position: 'relative',
                maxWidth: 325,
                width: 345,
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 250, 1)',
                overflow: 'hidden',
                '@media (max-width: 1508px)': {
                  width: 260,
                },
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <Link
                href={`detail/${items.productId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CardContent>
                  <Typography
                    marginLeft={1}
                    marginTop={3}
                    variant="h6"
                    component="div"
                    gutterBottom
                  >
                    {items.productName}
                  </Typography>
                  <Typography marginLeft={1} variant="caption" display="block" gutterBottom noWrap>
                    {items.description}
                  </Typography>
                </CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="column" alignItems="start" marginLeft={3} paddingBottom={10}>
                    <Typography variant="body2" sx={{ padding: 0 }}>
                      Price:
                    </Typography>
                    <Typography variant="h5" sx={{ padding: 0, fontWeight: 'bold' }}>
                      ${items.price}
                    </Typography>
                    <Typography variant="caption" sx={{ padding: 0 }}>
                      per <span>{items.unitOfMeasure}</span>
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '168px',
                      height: '168px',
                      marginRight: 2,
                      paddingTop: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        items.productImages[0]?.imageUrl ||
                        'https://res.cloudinary.com/dmmk9racr/image/upload/v1719892453/cat-1_q49n2j.png'
                      }
                      alt={items.productName}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </Stack>
              </Link>
              <Stack direction="column" justifyContent="center" alignItems="center" margin={3}>
                <Button
                  variant="contained"
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
                  onClick={() => handleAddCart(items.productId)}
                >
                  Add to cart
                </Button>
              </Stack>
            </Card>
          </Box>
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
