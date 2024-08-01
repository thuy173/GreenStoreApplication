import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Grid } from '@mui/material';

import ProfileServices from 'src/services/ProfileServices';

import OrderList from '../order-list';

// ----------------------------------------------------------------------

export default function OrderView() {
  const location = useLocation();
  const { userId, name, phoneNumber, email, shippingAddress, items, comboId, priceCombo } = location.state || {};
  const [dataDetail, setDataDetail] = useState(null);

  const fetchData = async () => {
    try {
      const response = await ProfileServices.getDataById(userId);
      if (response?.data && response?.status === 200) {
        setDataDetail(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <Grid item mt={3} container spacing={2}>
      <OrderList
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        shippingAddress={shippingAddress}
        dataDetail={dataDetail}
        items={items}
        comboId={comboId}
        priceCombo={priceCombo}
      />
    </Grid>
  );
}
