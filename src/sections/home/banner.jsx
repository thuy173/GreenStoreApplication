// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Banner() {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  // };

  return (
    // <Stack mx={8}>
    //   <Slider {...settings}>
    //     <Box position="relative">
    //       <img
    //         src="../../../public/assets/images/main/h1slide2.webp"
    //         alt=""
    //         style={{ width: '100%', height: 'auto', objectFit: 'cover', marginLeft: '8%' }}
    //       />
    //       <Typography
    //         variant="h1"
    //         color="white"
    //         sx={{
    //           position: 'absolute',
    //           top: '40%',
    //           left: '66%',
    //           transform: 'translate(-50%, -50%)',
    //           color: '#3b413a',
    //           padding: '8px',
    //           borderRadius: '8px',
    //         }}
    //       >
    //         Hello
    //       </Typography>
    //     </Box>
    //     <Box position="relative">
    //       <img
    //         src="../../../public/assets/images/main/h1slide2.webp"
    //         alt=""
    //         style={{ width: '100%', height: 'auto', objectFit: 'cover', marginLeft: '8%' }}
    //       />
    //       <Typography
    //         variant="h1"
    //         color="white"
    //         sx={{
    //           position: 'absolute',
    //           top: '40%',
    //           left: '66%',
    //           transform: 'translate(-50%, -50%)',
    //           color: '#3b413a',
    //           padding: '8px',
    //           borderRadius: '8px',
    //         }}
    //       >
    //         Hello
    //       </Typography>
    //     </Box>
    //     <Box position="relative">
    //       <img
    //         src="../../../public/assets/images/main/h1slide2.webp"
    //         alt=""
    //         style={{ width: '100%', height: 'auto', objectFit: 'cover', marginLeft: '8%' }}
    //       />
    //       <Typography
    //         variant="h1"
    //         color="white"
    //         sx={{
    //           position: 'absolute',
    //           top: '40%',
    //           left: '66%',
    //           transform: 'translate(-50%, -50%)',
    //           color: '#3b413a',
    //           padding: '8px',
    //           borderRadius: '8px',
    //         }}
    //       >
    //         Hello
    //       </Typography>
    //     </Box>

    //   </Slider>
    // </Stack>
    <Stack>
      <Box position="relative">
        <img
          src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719930936/FuirtWeb_1_b6de2b.png"
          alt=""
          style={{ objectFit: 'cover', width: '100%' }}
        />
        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            top: { xs: '10%', sm: '16%' },
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          Sweet Detox With Nutrients
          <p
            style={{
              position: 'absolute',
              top: { xs: '58%', sm: '60%' },
              left: '50%',
              transform: 'translate(-50%, 0%)',
              fontSize: 26,
              fontWeight: 'normal',
            }}
          >
            Taste Good, Feel Good!
          </p>
        </Typography>
      </Box>
    </Stack>
  );
}
