import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  Box,
  Step,
  Grid,
  Stack,
  Button,
  Stepper,
  Divider,
  StepLabel,
  Container,
  Typography,
  IconButton,
  CardContent,
  StepContent,
} from '@mui/material';

import OrderServices from 'src/services/OrderServices';

import OrderSteps from 'src/components/stepper/order-step';
import CustomSnackbar from 'src/components/snackbar/snackbar';
import CancelOrderDialog from 'src/components/dialog/cancel-order-dialog';

const initialSteps = [
  { label: 'PENDING', date: '10:51 07-07-2024' },
  { label: 'PROCESSING', date: '10:52 07-07-2024' },
  { label: 'SHIPPED', date: '15:22 08-07-2024' },
  { label: 'DELIVERED' },
];

const OrderTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };
  const handleOpenChangeStatus = (orderId) => {
    setOpenChangeStatus(true);
    setSelectedOrderId(orderId);
  };

  const handleCloseChangeStatus = () => {
    setOpenChangeStatus(false);
    setSelectedOrderId(null);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await OrderServices.changeStatus(orderId, 'CANCELED');

      if (response && response?.status === 200) {
        showAlert('success', 'Canceled order successfully!');
        handleBackProfile();
        setOpenChangeStatus(false);
      } else {
        setAlert({
          message: response?.response?.data?.message || 'An error occurred. Please check again!',
          severity: 'error',
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      setAlert({
        message: error.message || 'An error occurred.',
        severity: 'error',
        isOpen: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrderServices.getDataById(id);
        if (response?.data && response?.status === 200) {
          setDataDetail(response.data);
          setOrderItems(response.data.orderItems);
        } else {
          console.error(response ?? 'Unexpected response structure');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleBackProfile = () => {
    navigate('/profile?choice=Purchase%20Order');
  };

  const getStepIndex = (status) => initialSteps.findIndex(step => step.label === status);


  return (
    <Container>
      <Box sx={{ p: 2, backgroundColor: '#ffffff', marginTop: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handleBackProfile}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant="body1">
            Code: {dataDetail?.orderId} | <span>{dataDetail?.status}</span>
          </Typography>
        </Stack>

        <Divider sx={{ mb: 7, mt: 1.5 }} />
        <OrderSteps steps={initialSteps} activeStep={getStepIndex(dataDetail?.status)} />
      </Box>
      <Box sx={{ backgroundColor: '#fff', p: 2, pt: 10 }}>
        <Grid container spacing={2} pb={5}>
          <Grid item xs={12} md={4} ml={4}>
            <Typography variant="h5" mb={3}>
              Shipping address
            </Typography>
            <Typography variant="h6" mb={2}>
              {dataDetail?.fullName}
            </Typography>
            <Typography variant="body2">{dataDetail?.phoneNumber}</Typography>
            <Typography variant="body2">{dataDetail?.shippingAddress}</Typography>
          </Grid>
          <Grid item xs={12} md={7} ml={5}>
            <Box sx={{ maxWidth: 400 }}>
              <Stepper orientation="vertical">
                {initialSteps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? <Typography variant="caption">Last step</Typography> : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {orderItems.map((item) => (
        <Box key={item.orderItemId} sx={{ backgroundColor: '#fafafa', mb: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <img
                    src={item.productImages[0].imageUrl}
                    alt={item.productName}
                    style={{ width: 80, height: 80, marginRight: 16 }}
                  />
                  <Box>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Typography color="textSecondary">{item.description}</Typography>
                    <Typography>x{item.quantity}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box textAlign="right" mb={1}>
                <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                  ₫{item.price}
                </Typography>
                <Typography variant="h6" color="error">
                  ${item.price}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }}>
            Amount: <span style={{ fontWeight: 'bold' }}>${item.totalPrice}</span>
          </Divider>
        </Box>
      ))}
      <Stack
        direction="row"
        justifyContent={
          dataDetail?.status === 'PENDING' || dataDetail?.status === 'PROCESSING'
            ? 'space-between'
            : 'end'
        }
        alignItems="center"
        mx={2}
      >
        {(dataDetail?.status === 'PENDING' || dataDetail?.status === 'PROCESSING') && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenChangeStatus(dataDetail?.orderId)}
          >
            Cancel order
          </Button>
        )}
        <Box display="flex" justifyContent="end" alignItems="center">
          <Stack justifyContent="center" alignItems="end">
            <Typography variant="h6" color="textPrimary" mb={1}>
              Total: ${dataDetail?.totalAmount}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <CancelOrderDialog
        open={openChangeStatus}
        onClose={handleCloseChangeStatus}
        onConfirm={() => handleCancelOrder(selectedOrderId)}
      />
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Container>
  );
};

export default OrderTracking;
