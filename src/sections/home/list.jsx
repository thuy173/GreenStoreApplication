import React from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {
  Card,
  Grid,
  CardMedia,
  IconButton,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ListMenu() {
  return (
    <Grid container spacing={3} p={8}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="250"
              image="https://res.cloudinary.com/dmmk9racr/image/upload/v1719571724/tqimeih4m8xlimm6ap0w.png"
              alt="Paella dish"
              sx={{ objectFit: 'fit' }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShoppingCartCheckoutIcon />
              </IconButton>

              <Label sx={{ marginLeft: 'auto', padding: 2 }}>$123</Label>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
