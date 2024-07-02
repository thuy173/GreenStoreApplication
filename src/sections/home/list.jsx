import React, { useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Card, Grid, CardMedia, IconButton, Typography, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

export default function ListMenu() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ratings, setRatings] = useState(Array(6).fill(0));

  const handleRatingClick = (cardIndex, rating) => {
    const newRatings = [...ratings];
    newRatings[cardIndex] = rating;
    setRatings(newRatings);
  };

  return (
    <Grid container spacing={3} p={8}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            sx={{ position: 'relative' }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="250"
                image="https://res.cloudinary.com/dmmk9racr/image/upload/v1719571724/tqimeih4m8xlimm6ap0w.png"
                alt="Paella dish"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" color="#3b413a" gutterBottom>
                  Watermelon
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    {Array.from({ length: 5 }).map((__, starIndex) => (
                      <StarIcon
                        key={starIndex}
                        sx={{
                          color: starIndex < ratings[index] ? '#FFD700' : '#ccc',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleRatingClick(index, starIndex + 1)}
                      />
                    ))}
                  </Box>
                  <Typography sx={{ paddingLeft: 2 }}>$123</Typography>
                </Box>
              </CardContent>
            </Card>
            {hoveredIndex === index && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 98,
                  width: 38,
                  height: 38,
                  bgcolor: 'action.selected',
                }}
              >
                <ShoppingCartCheckoutIcon />
              </IconButton>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
