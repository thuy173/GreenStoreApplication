import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Stack mx={8}>
      <Slider {...settings}>
        <Box position="relative">
          <img
            src="../../../public/assets/images/main/banner2.jpg"
            alt=""
            style={{ width: '50%', height: 'auto', objectFit: 'cover', marginLeft: '8%' }}
          />
          <Typography
            variant="h1"
            color="white"
            sx={{
              position: 'absolute',
              top: '40%',
              left: '66%',
              transform: 'translate(-50%, -50%)',
              color: '#f47c7c',
              padding: '8px',
              borderRadius: '8px',
            }}
          >
            Hello
          </Typography>
        </Box>
        <Box position="relative">
          <img
            src="../../../public/assets/images/main/banner2.jpg"
            alt=""
            style={{ width: '50%', height: 'auto', objectFit: 'cover', marginLeft: '8%' }}
          />
          <Typography
            variant="h1"
            color="white"
            sx={{
              position: 'absolute',
              top: '40%',
              left: '66%',
              transform: 'translate(-50%, -50%)',
              color: '#f47c7c',
              padding: '8px',
              borderRadius: '8px',
            }}
          >
            Hello
          </Typography>
        </Box>
        <Box position="relative">
          <img
            src="../../../public/assets/images/main/banner2.jpg"
            alt=""
            style={{ width: '50%', height: 'auto', objectFit: 'cover', marginLeft: '8%' }}
          />
          <Typography
            variant="h1"
            color="white"
            sx={{
              position: 'absolute',
              top: '40%',
              left: '66%',
              transform: 'translate(-50%, -50%)',
              color: '#f47c7c',
              padding: '8px',
              borderRadius: '8px',
            }}
          >
            Hello
          </Typography>
        </Box>
        
      </Slider>
    </Stack>
  );
}
