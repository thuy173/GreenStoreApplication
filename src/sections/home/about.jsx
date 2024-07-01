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
  width: '50%',
  height: 'auto',
  objectFit: 'cover',
  display: 'block',
  boxShadow: '0px 4px 8px rgb(214, 229, 217)',
  border: '3px solid #a2de96',
  marginLeft: 80,
});

const SmallImage = styled('img')({
  position: 'absolute',
  bottom: '-110px',
  right: '25%',
  width: '30%',
  height: 'auto',
  objectFit: 'cover',
  boxShadow: '0px 4px 8px rgb(214, 229, 217)',
  border: '3px solid #a2de96',
});

const OverlayImages = () => (
  <Stack direction="row" alignItems="center" spacing={2} paddingTop={8}>
    <Box flex={1}>
      <Typography color="#3b413a" variant="h3" gutterBottom textAlign="center">
        Come to our flower shop
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ px: 10 }}>
        It will be an interesting experience, refreshing your soul and enjoying a more beautiful
        life.
      </Typography>
    </Box>
    <ImageContainer>
      <LargeImage src="https://res.cloudinary.com/dmmk9racr/image/upload/v1718962373/z6hspwrib2v1rbqkhatv.png" alt="Large Image" />
      <SmallImage src="https://res.cloudinary.com/dmmk9racr/image/upload/v1718982327/agmuo34upymyuc4zev97.png" alt="Small Image" />
    </ImageContainer>
  </Stack>
);

export default OverlayImages;
