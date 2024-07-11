import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {
  Box,
  Tab,
  Grid,
  Tabs,
  Stack,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Container,
  Typography,
  IconButton,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import OrderServices from 'src/services/OrderServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

import OrderTracking from './tracking';

const PurchaseOrder = () => {
  const [openOrderTracking, setOpenOrderTracking] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [value, setValue] = useState(0);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Returned'];

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const tabStyles = {
    active: {
      color: '#507c5c',
      backgroundColor: '#f5fcf4',
    },
    default: {
      color: 'black',
      backgroundColor: 'inherit',
    },
  };

  const handleOpenOrderTracking = () => {
    setOpenOrderTracking(true);
  };

  const handleOpenChangeStatus = (orderId) => {
    setOpenChangeStatus(true);
    setSelectedOrderId(orderId);
  };

  const handleCloseChangeStatus = () => {
    setOpenChangeStatus(false);
    setSelectedOrderId(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrderData = async () => {
    try {
      const response = await OrderServices.getData();
      if (response?.data && response?.status === 200) {
        setOrderData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const filterOrders = (orders, status) => {
    if (status === 'All') {
      return orders;
    }
    return orders.filter((order) => order.status === status.toUpperCase());
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await OrderServices.changeStatus(orderId, 'CANCELED');

      if (response && response.status === 200) {
        showAlert('success', 'Canceled order successfully!');
        fetchOrderData();
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

  return (
    <>
      {!openOrderTracking ? (
        <Container>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="order status tabs"
              variant="fullWidth"
            >
              {tabs.map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  sx={value === index ? tabStyles.active : tabStyles.default}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ mt: 1.5 }}>
            {filterOrders(orderData, tabs[value]).map((order) => (
              <Box
                key={order.orderId}
                sx={{ borderRadius: '4px', backgroundColor: '#ffffff', mb: 2.5, p: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <CardContent onClick={handleOpenOrderTracking}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <img
                          src={order.orderItems[0].productImages[0].imageUrl}
                          alt={order.orderItems[0].productName}
                          style={{ width: 80, height: 80, marginRight: 16 }}
                        />
                        <Box>
                          <Typography variant="h6">{order.orderItems[0].productName}</Typography>
                          <Typography color="textSecondary">
                            {order.orderItems[0].description}
                          </Typography>
                          <Typography>x{order.orderItems[0].quantity}</Typography>
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
                        ₫{order.orderItems[0].price}
                      </Typography>
                      <Typography variant="h6" color="error">
                        ${order.orderItems[0].price}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="h6" color="textPrimary">
                        Amount: ${order.orderItems[0].totalPrice}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                {expandedOrders.includes(order.orderId) && (
                  <>
                    {order.orderItems.slice(1).map((item) => (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Box key={item.orderItemId} sx={{ mt: 2 }}>
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
                                    <Typography color="textSecondary">
                                      {item.description}
                                    </Typography>
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
                              <Box textAlign="right">
                                <Typography variant="h6" color="textPrimary">
                                  Amount: ${item.totalPrice}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ))}
                  </>
                )}
                {order.orderItems.length > 1 && (
                  <Stack justifyContent="center" alignItems="center">
                    <Tooltip
                      title={expandedOrders.includes(order.orderId) ? 'See less' : 'See more'}
                    >
                      <IconButton onClick={() => toggleExpandOrder(order.orderId)}>
                        {expandedOrders.includes(order.orderId) ? (
                          <KeyboardDoubleArrowUpIcon />
                        ) : (
                          <KeyboardDoubleArrowDownIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )}
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Contact the store if you encounter any problems.
                  </Typography>
                  <Box display="flex">
                    {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenChangeStatus(order.orderId)}
                      >
                        Cancel order
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Dialog
            open={openChangeStatus}
            onClose={handleCloseChangeStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Cancel Order</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseChangeStatus}
              sx={{
                position: 'absolute',
                right: 2,
                top: 2,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to cancel this order?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseChangeStatus} color="primary">
                No
              </Button>
              <Button onClick={() => handleCancelOrder(selectedOrderId)} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <CustomSnackbar
            open={alert.isOpen}
            onClose={handleCloseAlert}
            message={alert.message}
            severity={alert.severity}
          />
        </Container>
      ) : (
        <OrderTracking />
      )}
    </>
  );
};

export default PurchaseOrder;
