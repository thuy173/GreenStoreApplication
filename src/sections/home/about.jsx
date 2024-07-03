import React from 'react';

import ChefIcon from '@mui/icons-material/Kitchen';
import ServiceIcon from '@mui/icons-material/RoomService';
import TasteIcon from '@mui/icons-material/RestaurantMenu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, Card, Grid, Stack, Container, Typography, CardContent } from '@mui/material';

const AboutHome = () => (
  <Container>
    <Stack spacing={3} p={5} direction="row" justifyContent="space-evenly" alignItems="center">
      <Grid item xs={4}>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Why Choose Our Food
          </Typography>
          <Typography variant="body1" paragraph>
            Quality of Service, Food, Ambiance, and Value of Money are the primary elements for
            choosing a restaurant. Shaifs Cuisine is one of the most exquisite fine-dining
            restaurants in Chittagong cities with a captivating view of GEC Hills, perfect ambiance,
            and scrumptious food.
          </Typography>
        </Box>
      </Grid>
      <Grid item container xs={8} sm={8} md={20} spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item sm={6}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#d6e5d8', color:'#26643b' }}>
            <CardContent>
              <RestaurantIcon fontSize="large" />
              <Typography variant="h6">Quality Food</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#d6e5d8', color:'#26643b' }}>
            <CardContent>
              <TasteIcon fontSize="large" />
              <Typography variant="h6">Class Taste</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#d6e5d8', color:'#26643b' }}>
            <CardContent>
              <ChefIcon fontSize="large" />
              <Typography variant="h6">Skilled Chef</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#d6e5d8', color:'#26643b' }}>
            <CardContent>
              <ServiceIcon fontSize="large" />
              <Typography variant="h6">Best Service</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  </Container>
);

export default AboutHome;
