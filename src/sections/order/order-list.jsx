import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Stack,
  Button,
  Avatar,
  Divider,
  TextField,
  Container,
  Typography,
} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function OrderList({ name, phoneNumber, email, shippingAddress }) {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
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

        <Typography variant="body1">Thanh Thủy (+84) 332331829</Typography>
        <Typography variant="body2">
          7 Ngõ 36 Lê Thanh Nghị, Phường Cầu Dền, Quận Hai Bà Trưng, Hà Nội
        </Typography>
      </Box>
      <Box sx={{ mt: 2, p: 2, borderRadius: '4px', backgroundColor: '#ffffff' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Avatar
                  variant="square"
                  alt="product"
                  src="image_url"
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">Dụng cụ xỏ chỉ kim loại (chiếc) #0101</Typography>
                <Typography variant="body2">Loại: Cán nhựa</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">Đơn giá: ₫2.000</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Số lượng: 5</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Thành tiền: ₫10.000</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <TextField fullWidth label="Lưu ý cho Người bán..." variant="outlined" />
            </Box>
          </Grid>
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
            Tổng tiền hàng: $10.000
          </Typography>
          <Typography variant="body1" align="right">
            Phí vận chuyển: $16.500
          </Typography>
          <Typography variant="h6" align="right">
            Tổng thanh toán: <span style={{ color: '#507c5c' }}>$26.500</span>
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6">Order Details</Typography>
        {name && <Typography>Name: {name}</Typography>}
        {phoneNumber && <Typography>Phone Number: {phoneNumber}</Typography>}
        {email && <Typography>Email: {email}</Typography>}
        {shippingAddress && <Typography>Shipping Address: {shippingAddress}</Typography>}
      </Box>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Container>
  );
}

OrderList.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  shippingAddress: PropTypes.string,
};
