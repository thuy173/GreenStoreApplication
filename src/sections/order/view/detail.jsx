import React, { useState, useEffect } from 'react';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {
  Box,
  Tab,
  Grid,
  Tabs,
  Stack,
  Button,
  Divider,
  Tooltip,
  Container,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import OrderServices from 'src/services/OrderServices';

import OrderTracking from './tracking';

const PurchaseOrder = () => {
  const [openOrderTracking, setOpenOrderTracking] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [value, setValue] = useState(0);
  const [expandedOrders, setExpandedOrders] = useState([]);

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Returned'];

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchProductData = async () => {
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
    fetchProductData();
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
                    <CardContent>
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
                    <Tooltip title={expandedOrders.includes(order.orderId) ? "See less" : "See more"}>
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
                      <Button variant="contained" color="error" onClick={handleOpenOrderTracking}>
                        Cancel order
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      ) : (
        <OrderTracking />
      )}
    </>
  );
};

export default PurchaseOrder;
