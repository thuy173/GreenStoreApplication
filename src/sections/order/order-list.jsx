import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  Divider,
  TextField,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import OrderServices from 'src/services/OrderServices';
import { clearCart } from 'src/redux/actions/cartAction';

import Iconify from 'src/components/iconify/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function OrderList({
  name,
  phoneNumber,
  email,
  shippingAddress,
  dataDetail,
  items,
}) {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const getActiveAddress = () => {
    if (dataDetail?.address) {
      const activeAddress = dataDetail.address.find((addr) => addr.isActive);
      return activeAddress ? `${activeAddress.address}, ${activeAddress.addressDetail}` : null;
    }
    return null;
  };

  const fullAddress = getActiveAddress() || shippingAddress;
  const totalOrderAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingFee = 12;
  const totalPayment = totalOrderAmount + shippingFee;

  const handleOrder = async () => {
    const payload = {
      customerId: dataDetail?.customerId || null,
      discount: 0,
      totalAmount: totalPayment,
      shippingAddress: getActiveAddress() || shippingAddress,
      latitude: 0,
      longitude: 0,
      orderItems: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    if (!dataDetail?.customerId) {
      payload.guestName = name;
      payload.guestEmail = email;
      payload.guestPhone = phoneNumber;
    }

    try {
      const response = await OrderServices.addData(payload);
      if (response && response.status === 200) {
        dispatch(clearCart());
        setOpenDialog(true);
        setTimeout(() => {
          navigate('/profile?choice=Purchase%20Order');
        }, 300000);
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to add order:', error);
      showAlert('error', error.message || 'An error occurred!');
    }
  };

  return (
    <Container>
      <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#ffffff' }}>
        <Stack direction="row">
          <Iconify color="#507c5c" icon="mdi:address-marker" />
          <Typography ml={0.5} variant="h6" color="#507c5c">
            Shipping address
          </Typography>
        </Stack>

        <Typography variant="body1" mt={1} ml={3}>
          {dataDetail?.fullName || name} (+84) {dataDetail?.phoneNumber || phoneNumber}
        </Typography>
        <Typography variant="body2" mt={1} ml={3}>
          {fullAddress}
        </Typography>
      </Box>
      <Box sx={{ mt: 2, p: 2, borderRadius: '4px', backgroundColor: '#ffffff' }}>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={2} ml={4}>
                  <img
                    src={item.productImages[0].imageUrl}
                    alt={item.productName}
                    style={{ width: 60, height: 60 }}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant="body1">{item.productName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Grid item ml={4}>
                  <Typography variant="body2">Price: ${item.price.toLocaleString()}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Amount: ₫{item.totalPrice.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </Grid>
          ))}
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth label="Lưu ý cho Người bán..." variant="outlined" />
          </Box>
        </Grid>
      </Box>
      <Box sx={{ mt: 2, p: 2, borderRadius: '4px', backgroundColor: '#ffffff' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body2">Đơn vị vận chuyển: Nhanh</Typography>
            <Typography variant="body2">Đảm bảo nhận hàng từ 10 Tháng 7 - 11 Tháng 7</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined">Thay Đổi</Button>
          </Grid>
        </Grid>
        <Typography variant="body2">
          Hoặc chọn phương thức Hỏa Tốc để Đảm bảo nhận hàng vào hôm nay
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction="column" justifyContent="center" alignItems="end" spacing={3}>
          <Typography variant="body1" align="right">
            Tổng tiền hàng: ${totalOrderAmount.toLocaleString()}
          </Typography>
          <Typography variant="body1" align="right">
            Phí vận chuyển: ${shippingFee}
          </Typography>
          <Typography variant="h6" align="right">
            Tổng thanh toán:{' '}
            <span style={{ color: '#507c5c' }}>${totalPayment.toLocaleString()}</span>
          </Typography>
        </Stack>
        <Grid item xs={12} container justifyContent="end" alignItems="end">
          <Button
            variant="outlined"
            sx={{
              marginTop: 4,
              borderColor: '#507c5c',
              color: '#507c5c',
              '&:hover': {
                backgroundColor: '#26643b',
                color: '#d6e5d8',
                borderColor: '#507c5c',
              },
            }}
            onClick={handleOrder}
          >
            Payment
          </Button>
        </Grid>
      </Box>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Your order has been placed successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

OrderList.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  shippingAddress: PropTypes.string,
  dataDetail: PropTypes.shape({
    customerId: PropTypes.any,
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.arrayOf(
      PropTypes.shape({
        addressId: PropTypes.number,
        address: PropTypes.string,
        addressDetail: PropTypes.string,
        isActive: PropTypes.bool,
      })
    ),
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number,
      productName: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      totalPrice: PropTypes.number,
    })
  ),
};