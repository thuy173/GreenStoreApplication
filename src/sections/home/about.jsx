import React from 'react';

import ChefIcon from '@mui/icons-material/Kitchen';
import ServiceIcon from '@mui/icons-material/RoomService';
import TasteIcon from '@mui/icons-material/RestaurantMenu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, Card, Grid, Container, Typography, CardContent } from '@mui/material';

const OverlayImages = () => (
  <Container>
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Why Choose Our Food
      </Typography>
      <Typography variant="body1" paragraph>
        Quality of Service, Food, Ambiance, and Value of Money are the primary elements for choosing
        a restaurant. Shaifs Cuisine is one of the most exquisite fine-dining restaurants in
        Chittagong cities with a captivating view of GEC Hills, perfect ambiance, and scrumptious
        food.
      </Typography>
    </Box>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ textAlign: 'center', p: 2 }}>
          <CardContent>
            <RestaurantIcon fontSize="large" />
            <Typography variant="h6">Quality Food</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ textAlign: 'center', p: 2 }}>
          <CardContent>
            <TasteIcon fontSize="large" />
            <Typography variant="h6">Classical Taste</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ textAlign: 'center', p: 2 }}>
          <CardContent>
            <ChefIcon fontSize="large" />
            <Typography variant="h6">Skilled Chef</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ textAlign: 'center', p: 2 }}>
          <CardContent>
            <ServiceIcon fontSize="large" />
            <Typography variant="h6">Best Service</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

export default OverlayImages;
