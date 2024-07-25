import { Box, Grid, Stack, Divider, Typography } from '@mui/material';

import Link from 'src/components/link';

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <Box
      sx={{
        background: `url('https://res.cloudinary.com/dmmk9racr/image/upload/v1721894694/footerbgt4_f0hsgp.png')`,
        backgroundSize: 'container',
        backgroundRepeat: 'no-repeat',
        maxHeight: '100vh',
      }}
    >
      <Grid container spacing={4} justifyContent="end" sx={{ padding: '2% 12%' }}>
        <Grid item xs={12} sm={6} md={3} mt={9}>
          <Stack spacing={3} direction="row">
            <Link color="white" href="#">
              <img src="/assets/images/main/facebook.png" alt="Facebook" width="38" height="38" />
            </Link>
            <Link color="white" href="#">
              <img src="/assets/images/main/instagram.png" alt="Twitter" width="38" height="38" />
            </Link>
            <Link color="white" href="#">
              <img src="/assets/images/main/tiktok.png" alt="Instagram" width="38" height="38" />
            </Link>
            <Link color="white" href="#">
              <img src="/assets/images/main/youtube.png" alt="Instagram" width="38" height="38" />
            </Link>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="row" py={6}>
        {' '}
      </Stack>
      <Box mt={2} textAlign="center">
        <Divider sx={{ backgroundColor: 'white', marginBottom: '16px' }} />
        <Typography mt={-2} variant="body2" color="#26643b">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
