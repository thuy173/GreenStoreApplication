import { Box, Divider, Typography } from '@mui/material';
import { YouTube, Facebook, Instagram } from '@mui/icons-material';

import Link from 'src/components/link';

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 2.5,
          backgroundColor: '#f5f5f5',
          borderTop: '1px dashed  #4CAF50',
          animation: ` 2s linear infinite`,
          backgroundImage: 'linear-gradient(90deg, #4CAF50 50%, rgba(255, 255, 255, 0) 0%)',
          backgroundSize: '10px 1px',
          backgroundRepeat: 'repeat-x',
        }}
      >
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontFamily: 'Pacifico, cursive',
            fontWeight: 'bold',
            color: '#4CAF50',
            mb: 1,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            WebkitTextStroke: '1px white',
            transition: 'color 0.3s ease, transform 0.3s ease',
            '&:hover': {
              color: '#388E3C',
              transform: 'scale(1.05)',
            },
          }}
        >
          GREEN STORE
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 1,
          }}
        >
          <Link href="https://facebook.com" target="_blank" sx={{ mx: 1 }}>
            <Facebook sx={{ color: '#3b5998', fontSize: '2rem' }} />
          </Link>
          <Link href="https://instagram.com" target="_blank" sx={{ mx: 1 }}>
            <Instagram sx={{ color: '#E1306C', fontSize: '2rem' }} />
          </Link>

          <Link href="https://youtube.com" target="_blank" sx={{ mx: 1 }}>
            <YouTube sx={{ color: '#FF0000', fontSize: '2rem' }} />
          </Link>
        </Box>
      </Box>
      <Box textAlign="center" sx={{ backgroundColor: '#f5f5f5' }}>
        <Divider sx={{ backgroundColor: 'white', marginBottom: '16px' }} />
        <Typography mt={-2} variant="body2" color="#26643b">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
