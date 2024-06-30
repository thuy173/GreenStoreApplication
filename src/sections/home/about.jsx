import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Box, Stack, Typography } from '@mui/material';

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
});

const LargeImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  display: 'block',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  border: '5px solid #fff',
});

const SmallImage = styled('img')({
  position: 'absolute',
  bottom: '-110px',
  right: '5%',
  width: '30%',
  height: 'auto',
  objectFit: 'cover',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  border: '5px solid #fff',
});

const OverlayImages = () => (
  <Stack direction="row" alignItems="center" spacing={2} paddingTop={8}>
    <Box flex={1}>
      <Typography color="#f47c7c" variant="h3" gutterBottom textAlign="center">
        Come to our flower shop
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ px: 10 }}>
        It will be an interesting experience, refreshing your soul and enjoying a more beautiful
        life.
      </Typography>
    </Box>
    <ImageContainer>
      <LargeImage src="../../../public/assets/images/product/flower42.jpg" alt="Large Image" />
      <SmallImage src="../../../public/assets/images/product/flower17.jpg" alt="Small Image" />
    </ImageContainer>
  </Stack>
);

export default OverlayImages;
