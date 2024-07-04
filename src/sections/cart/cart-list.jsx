import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetchCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container justifyContent="space-around" alignItems="center" mt={7}>
      {cartItemData.map((item, index) => (
        <Paper key={item.cartItemId} elevation={3} style={{ padding: 28, marginBottom: 5 }}>
          <Stack direction="row" spacing={19} alignItems="center" justifyContent="space-around">
            <Grid item container>
              <FormControlLabel
                control={<Checkbox checked={item.checked} onChange={handleCheckboxChange(index)} />}
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
                  inputProps={{ style: { textAlign: 'center', width: '30px' } }}
                />
                <IconButton onClick={() => handleIncrement(index)} size="small">
                  <Add />
                </IconButton>
              </Box>
              <Typography ml={2} variant="body2" color="error">
                Còn {item.quantityInStock} sản phẩm
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" fontWeight="bold">
                ₫{item.totalPrice.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="text" color="error">
                Xóa
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
  );
}
