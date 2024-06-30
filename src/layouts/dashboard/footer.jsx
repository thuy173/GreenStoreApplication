import { Box, Grid, Stack, Divider, Typography } from '@mui/material';

import Link from 'src/components/link';

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <Box
      sx={{
        // background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23f47c7c" fill-opacity="1" d="M0,64L80,101.3C160,139,320,213,480,208C640,203,800,117,960,90.7C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>')`,
        backgroundColor: '#f47c7c',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid container spacing={4} justifyContent="center" sx={{ padding: '40px 0' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src="/assets/images/favicon.svg"
            sx={{ width: 200, height: 120, cursor: 'pointer' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={2}>
            <Typography variant="h6" color="white">
              Services
            </Typography>
            <Link color="white" href="#">
              Products
            </Link>
            <Link color="white" href="#">
              Pricing
            </Link>
            <Link color="white" href="#">
              Support
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={2}>
            <Typography variant="h6" color="white">
              Resources
            </Typography>
            <Link color="white" href="#">
              Blog
            </Link>
            <Link color="white" href="#">
              FAQ
            </Link>
            <Link color="white" href="#">
              Contact
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack spacing={2}>
            <Typography variant="h6" color="white">
              Follow Us
            </Typography>
            <Link color="white" href="#">
              Facebook
            </Link>
            <Link color="white" href="#">
              Twitter
            </Link>
            <Link color="white" href="#">
              Instagram
            </Link>
          </Stack>
        </Grid>
      </Grid>
      <Box mt={2} textAlign="center">
        <Divider sx={{ backgroundColor: 'white', marginBottom: '16px' }} />
        <Typography mt={-2} variant="body2" color="white" >
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
