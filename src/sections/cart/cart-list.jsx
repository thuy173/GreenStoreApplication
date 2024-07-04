import Cookies from 'js-cookie';
import { useMemo, useState, useEffect } from 'react';

import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Grid,
  Stack,
  Paper,
  Button,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
} from '@mui/material';

import CartServices from 'src/services/CartServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function CartDetail() {
  const [cartItemData, setCartItemData] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleIncrement = async (index) => {
    const newCartData = [...cartItemData];
    newCartData[index].quantity += 1;
    setCartItemData(newCartData);
    await handleChangeQuantity(newCartData[index].quantity, newCartData[index].cartItemId);
  };

  const handleDecrement = async (index) => {
    const newCartData = [...cartItemData];
    if (newCartData[index].quantity > 1) {
      newCartData[index].quantity -= 1;
      setCartItemData(newCartData);
      await handleChangeQuantity(newCartData[index].quantity, newCartData[index].cartItemId);
    }
  };

  const handleCheckboxChange = (index) => (event) => {
    const newCartData = [...cartItemData];
    newCartData[index].checked = event.target.checked;
    setCartItemData(newCartData);
  };

  const getCartUuid = () => Cookies.get('CART_UUID');

  const fetchCartData = async () => {
    const cartUuid = getCartUuid();
    const id = localStorage.getItem('uD') || cartUuid;

    if (!id) {
      console.error('No cart UUID or user ID found');
      return;
    }

    try {
      const response = await CartServices.getCart(id);
      if (response?.data?.cartItem && response?.status === 200) {
        console.error(response);
        setCartItemData(response.data.cartItem.map((item) => ({ ...item, checked: false })));
        setCartData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeQuantity = async (quantity, cartItemId) => {
    try {
      const response = await CartServices.updateQuantity(cartData.customerId, cartItemId, quantity);
      if (response && response.status === 200) {
        fetchCartData();
      } else {
        setAlert({
          message:
            response?.response?.data?.message || 'An error occurred. Please try again later!',
          severity: 'error',
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      setAlert({
        message: error.message || 'An error occurred!',
        severity: 'error',
        isOpen: true,
      });
    }
  };
  const handleDeleteItem = async (cartItemId) => {
    try {
      const response = await CartServices.deleteItem(cartData.customerId, cartItemId);
      if (response && response.status === 200) {
        fetchCartData();
      } else {
        setAlert({
          message:
            response?.response?.data?.message || 'An error occurred. Please try again later!',
          severity: 'error',
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      setAlert({
        message: error.message || 'An error occurred!',
        severity: 'error',
        isOpen: true,
      });
    }
  };

  useEffect(() => {
    fetchCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalSelectedPrice = useMemo(
    () =>
      cartItemData.reduce((total, item) => {
        if (item.checked) {
          return total + item.totalPrice;
        }
        return total;
      }, 0),
    [cartItemData]
  );

  return (
    <Stack justifyContent="center" alignItems="center">
      <Paper elevation={3} style={{ padding: 10, marginBottom: 8, marginTop: 60 }}>
        <Stack direction="row" spacing={21.2} alignItems="center" justifyContent="space-around">
          <Grid item container pl={2}>
            <FormControlLabel control={<Checkbox />} label="" />
            <Grid item mt={1}>
              <Typography variant="body1">Product</Typography>
            </Grid>
          </Grid>
          <Grid item pl={12}>
            <Typography variant="body1">Price</Typography>
          </Grid>
          <Grid item>
            <Typography ml={2} variant="body1">
              Quantity
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Amount</Typography>
          </Grid>
          <Grid item>
            <Button variant="text" color="error">
              Action
            </Button>
          </Grid>
        </Stack>
      </Paper>
      <Grid container justifyContent="space-around" alignItems="center">
        {cartItemData.map((item, index) => (
          <Paper key={item.cartItemId} elevation={3} style={{ padding: 28, marginBottom: 8 }}>
            <Stack direction="row" spacing={19.3} alignItems="center" justifyContent="space-around">
              <Grid item container>
                <FormControlLabel
                  control={
                    <Checkbox checked={item.checked} onChange={handleCheckboxChange(index)} />
                  }
                  label=""
                />
                <img
                  src={item.productImages[0].imageUrl}
                  alt={item.productName}
                  style={{ width: 60, height: 60 }}
                />
                <Grid item xs ml={2}>
                  <Typography variant="body1">{item.productName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  ₫{item.price.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleDecrement(index)} size="small">
                    <Remove />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    size="small"
                    inputProps={{ style: { textAlign: 'center', width: '22px' } }}
                  />
                  <IconButton onClick={() => handleIncrement(index)} size="small">
                    <Add />
                  </IconButton>
                </Box>
                <Typography ml={2} variant="body2" color="error">
                  {item.quantityInStock} product left
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  ₫{item.totalPrice.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteItem(item.cartItemId)}
                >
                  Delete
                </Button>
              </Grid>
            </Stack>
          </Paper>
        ))}
        <CustomSnackbar
          open={alert.isOpen}
          onClose={handleCloseAlert}
          message={alert.message}
          severity={alert.severity}
        />
      </Grid>
      <Stack
        position="sticky"
        bottom={0}
        width="100%"
        bgcolor="white"
        boxShadow={3}
        p={5}
        textAlign="center"
        zIndex={1}
        backgroundColor="#f5fcf4"
        direction="row"
        justifyContent="space-around"
      >
        <Typography variant="body1" mt={1.5}>
          Total payment:{' '}
          <span style={{ fontWeight: 'bold' }}>${totalSelectedPrice.toLocaleString()}</span>
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#d6e5d8',
            width: '30%',
            color: '#26643b',
            borderRadius: 0.4,
            '&:hover': {
              backgroundColor: '#26643b',
              color: '#d6e5d8',
            },
          }}
        >
          Payment
        </Button>
      </Stack>
    </Stack>
  );
}
