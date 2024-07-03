import React, { useState, useEffect } from 'react';

import { Box, Card, Grid, Stack, Button, Typography, CardContent } from '@mui/material';

import ProductServices from 'src/services/ProductServices';

import Link from 'src/components/link';

// ----------------------------------------------------------------------

export default function ProductList() {
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
            <Link
              href={`detail/${items.productId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
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

                  <img
                    src={
                      items.productImages[0]?.imageUrl ||
                      'https://res.cloudinary.com/dmmk9racr/image/upload/v1719892453/cat-1_q49n2j.png'
                    }
                    alt={items.productName}
                    style={{ objectFit: 'cover', width: '50%', marginRight: 20, paddingTop: 10 }}
                  />
                </Stack>
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
                  >
                    Add to cart
                  </Button>
                </Stack>
              </Card>
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
