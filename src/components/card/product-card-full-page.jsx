import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, differenceInDays } from 'date-fns';

import { Box, Card, Stack, Button, Typography, CardContent } from '@mui/material';

import Link from 'src/components/link';

function ProductCardFullPage({ product, currentDate, handleAddCart, link }) {
  const createAtDate = parseISO(product.createAt);
  const isNewProduct = differenceInDays(currentDate, createAtDate) < 2;
  const isOutOfStock = product.quantityInStock === 0;

  return (
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
      {isNewProduct && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: '21%',
            backgroundColor: '#507c5c',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '0 16px 0 16px',
            fontWeight: 'bold',
            zIndex: 1,
            '@media (max-width: 1508px)': {
              right: '-3.8%',
            },
            '@media (max-width: 767px)': {
              right: '-31%',
            },
            '@media (max-width: 991px)': {
              right: '6%',
            },
          }}
        >
          New
        </Box>
      )}
      {isOutOfStock && (
        <Box
          sx={{
            position: 'absolute',
            top: '42%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '17px',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            zIndex: 2,
            textAlign: 'center',
            '@media (max-width: 1508px)': {
              left: '52%',
            },
            '@media (max-width: 767px)': {
              left: '55%',
            },
            '@media (max-width: 991px)': {
              left: '54%',
            },
          }}
        >
          Out of stock
        </Box>
      )}
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
        <Link href={link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardContent>
            <Typography marginLeft={1} marginTop={3} variant="h6" component="div" gutterBottom>
              {product.productName}
            </Typography>
            <Typography marginLeft={1} variant="caption" display="block" gutterBottom noWrap>
              {product.description}
            </Typography>
          </CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="column" alignItems="start" marginLeft={3} paddingBottom={10}>
              <Typography variant="body2" sx={{ padding: 0 }}>
                Price:
              </Typography>
              <Typography variant="h5" sx={{ padding: 0, fontWeight: 'bold' }}>
                ${product.price}
              </Typography>
              <Typography variant="caption" sx={{ padding: 0 }}>
                per <span>{product.unitOfMeasure}</span>
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
                  product.productImages[0]?.imageUrl ||
                  'https://res.cloudinary.com/dmmk9racr/image/upload/v1719892453/cat-1_q49n2j.png'
                }
                alt={product.productName}
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
            disabled={isOutOfStock}
            onClick={() => handleAddCart(product.productId)}
          >
            Add to cart
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

ProductCardFullPage.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number,
    productName: PropTypes.string,
    price: PropTypes.number,
    quantityInStock: PropTypes.number,
    description: PropTypes.string,
    createAt: PropTypes.any,
    unitOfMeasure: PropTypes.string,
    productImages: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
      })
    ),
  }).isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  handleAddCart: PropTypes.func.isRequired,
  link: PropTypes.any,
};

export default ProductCardFullPage;
