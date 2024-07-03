import React from 'react';

import { Grid, Stack, Container } from '@mui/material';

const CategoryHome = () => (
  <Container>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      // sx={{
      //   backgroundImage:
      //     'url(https://res.cloudinary.com/dmmk9racr/image/upload/v1719931510/FuirtWeb3_qwexd1.png)',
      //   backgroundSize: 'cover',
      //   height: '55vh',
      // }}
    >
      <Grid item container xs={12} spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892455/cat-2_vt6yea.png"
            alt=""
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892464/cat-3_up6sqj.png"
            alt=""
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892453/cat-1_q49n2j.png"
            alt=""
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719893181/Untitled_design_1_babkvn.png"
            alt=""
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892494/cat-5_nz38j1.png"
            alt=""
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
      </Grid>
    </Stack>
  </Container>
);

export default CategoryHome;
