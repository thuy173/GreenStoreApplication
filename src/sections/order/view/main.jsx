import { useLocation } from 'react-router-dom';

import { Grid } from '@mui/material';

import OrderList from '../order-list';

// ----------------------------------------------------------------------

export default function OrderView() {
  const location = useLocation();
  const { name, phoneNumber, email, shippingAddress } = location.state || {};
  return (
    <Grid item mt={5} container spacing={2}>
      <OrderList
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        shippingAddress={shippingAddress}
      />
    </Grid>
  );
}
