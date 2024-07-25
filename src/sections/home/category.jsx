import React from 'react';

import { Grid, Stack, Container } from '@mui/material';

const CategoryHome = () => (
  <Container>
    <Stack direction="row" justifyContent="center" alignItems="center" mt={6}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={2} sm={2.3} md={2.2} lg={2}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892455/cat-2_vt6yea.png"
            alt="Category 1"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={2} sm={2.3} md={2.2} lg={2}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892464/cat-3_up6sqj.png"
            alt="Category 2"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={2} sm={2.3} md={2.2} lg={2}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892453/cat-1_q49n2j.png"
            alt="Category 3"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={2} sm={2.3} md={2.2} lg={2}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719893181/Untitled_design_1_babkvn.png"
            alt="Category 4"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
        <Grid item xs={2} sm={2.3} md={2.2} lg={2}>
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719892494/cat-5_nz38j1.png"
            alt="Category 5"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Grid>
      </Grid>
    </Stack>
  </Container>
);

export default CategoryHome;
