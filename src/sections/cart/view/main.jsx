import { Grid } from '@mui/material';

import CartDetail from '../cart-list';

// ----------------------------------------------------------------------

export default function CartMain() {
  return (
    <Grid container spacing={2}>
      <CartDetail />
    </Grid>
  );
}
