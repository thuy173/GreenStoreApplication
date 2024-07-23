import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Stack,
  Radio,
  Button,
  Divider,
  TextField,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import OrderServices from 'src/services/OrderServices';
import { clearCart } from 'src/redux/actions/cartAction';

import Iconify from 'src/components/iconify/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import OrderSuccessDialog from 'src/components/dialog/order-success-dialog';

import VoucherDialog from './view/voucher-dialog';
import PaymentHandler from './view/check-out-form';

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
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [orderId, setOrderId] = useState();
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
  const [voucher, setVoucher] = useState({ voucherId: null, discount: 0 });

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    setPaymentMethod(newValue === 1 ? 'cash' : '');
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleVoucherSelect = ({ voucherId, discount }) => {
    setVoucher({ voucherId, discount });
  };

  const handleCloseCheckOut = () => {
    setCheckoutOpen(false);
  };

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
  const discountAmount = totalOrderAmount * (voucher.discount / 100);
  const discountedTotalOrderAmount = totalOrderAmount - discountAmount;
  const shippingFee = 12;
  const totalPayment = discountedTotalOrderAmount + shippingFee;

  const handleOrder = async () => {
    const activeAddress = getActiveAddress();
    const finalShippingAddress = activeAddress || shippingAddress;

    if (!finalShippingAddress) {
      showAlert('error', 'Shipping address is required to place an order.');
      return;
    }

    const paymentMethodSend = selectedTab === 1 ? 'cod' : 'stripe';

    const payload = {
      customerId: dataDetail?.customerId || null,
      discount: 0,
      totalAmount: totalPayment,
      orderDate: new Date().toISOString(),
      shippingAddress: finalShippingAddress,
      paymentMethod: paymentMethodSend,
      voucherId: voucher.voucherId,
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

        const orderItemCount = items.length;
        let cartItemCount = parseInt(localStorage.getItem('cartItemCount') || '0', 10);
        cartItemCount -= orderItemCount;
        localStorage.setItem('cartItemCount', Math.max(cartItemCount, 0).toString());

        setOrderId(response.data.orderId);
        if (selectedTab === 1) {
          setOpenDialog(true);
          localStorage.setItem('choice', 'Purchase Order');
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          setCheckoutOpen(true);
          setOpenDialog(false);
        }
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

  const handlePayment = () => {
    if (paymentMethod === 'cash') {
      handleOrder('cash');
    } else if (paymentMethod === 'stripe') {
      handleOrder('stripe');
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
                    Amount: ${item.totalPrice.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
            </Grid>
          ))}
          <Box sx={{ mt: 2, ml: 2 }}>
            <TextField size="small" fullWidth label="Note to the store..." variant="outlined" />
          </Box>
        </Grid>
      </Box>
      <Box sx={{ mt: 2, p: 2, borderRadius: '4px', backgroundColor: '#ffffff' }}>
        <Grid container justifyContent="end" alignItems="center">
          {voucher.discount !== 0 && (
            <Button
              variant="text"
              sx={{
                borderRadius: 0,
                color: 'red',
                bgcolor: 'transparent',
                border: '1px solid red',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#26643b',
                },
              }}
            >
              - {voucher.discount}%
            </Button>
          )}
          <Button
            variant="text"
            sx={{
              borderRadius: 0,
              color: '#26643b',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#26643b',
              },
            }}
            onClick={() => setOpenVoucherDialog(true)}
          >
            Choice voucher
          </Button>
          {openVoucherDialog && (
            <VoucherDialog
              open={openVoucherDialog}
              onClose={() => setOpenVoucherDialog(false)}
              totalOrderAmount={totalOrderAmount}
              onVoucherSelect={handleVoucherSelect}
            />
          )}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container justifyContent="start">
          <Grid item ml={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Payment methods
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }} mb={3}>
              <Button
                variant={selectedTab === 0 ? 'contained' : 'outlined'}
                sx={{
                  borderRadius: 0,
                  borderColor: selectedTab === 0 ? '#26643b' : '#507c5c',
                  color: selectedTab === 0 ? 'white' : '#507c5c',
                  backgroundColor: selectedTab === 0 ? '#26643b' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedTab === 0 ? '#26643b' : '#26643b',
                    color: selectedTab === 0 ? 'white' : '#d6e5d8',
                    borderColor: selectedTab === 0 ? '#26643b' : '#507c5c',
                  },
                }}
                onClick={() => handleChangeTab(null, 0)}
              >
                Bank card
              </Button>
              <Button
                value="cash"
                variant={selectedTab === 1 ? 'contained' : 'outlined'}
                sx={{
                  ml: 2,
                  borderRadius: 0,
                  borderColor: selectedTab === 1 ? '#26643b' : '#507c5c',
                  color: selectedTab === 1 ? 'white' : '#507c5c',
                  backgroundColor: selectedTab === 1 ? '#26643b' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedTab === 1 ? '#26643b' : '#26643b',
                    color: selectedTab === 1 ? 'white' : '#d6e5d8',
                    borderColor: selectedTab === 1 ? '#26643b' : '#507c5c',
                  },
                }}
                onClick={() => handleChangeTab(null, 1)}
              >
                Cash on Delivery
              </Button>
            </Box>

            {selectedTab === 0 && (
              <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
                <FormControlLabel value="stripe" control={<Radio />} label="Stripe" />
              </RadioGroup>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Stack direction="column" justifyContent="center" alignItems="end" spacing={3}>
          {voucher.discount !== 0 && (
            <Typography variant="body1" align="right" sx={{ textDecoration: 'line-through' }}>
              ${totalOrderAmount.toLocaleString()}
            </Typography>
          )}
          <Typography variant="body1" align="right">
            Total value of goods: ${discountedTotalOrderAmount.toLocaleString()}
          </Typography>
          <Typography variant="body1" align="right">
            Transport fee: ${shippingFee}
          </Typography>
          <Typography variant="h6" align="right">
            Total payment:{' '}
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
            onClick={handlePayment}
          >
            Order
          </Button>
        </Grid>
      </Box>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      {openDialog && <OrderSuccessDialog open={openDialog} onClose={() => setOpenDialog(false)} />}
      {checkoutOpen && (
        <PaymentHandler open={checkoutOpen} onClose={handleCloseCheckOut} orderId={orderId} />
      )}
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
