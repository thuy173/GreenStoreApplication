import React from 'react';

import {
  Box,
  Step,
  Stack,
  Button,
  Stepper,
  Divider,
  StepLabel,
  Container,
  Typography,
} from '@mui/material';

const steps = [
  { label: 'Đơn Hàng Đã Đặt', date: '10:51 07-07-2024' },
  { label: 'Đơn Hàng Đã Thanh Toán (₫128.700)', date: '10:52 07-07-2024' },
  { label: 'Đã Giao Cho ĐVVC', date: '15:22 08-07-2024' },
  { label: 'Chờ Giao Hàng' },
  { label: 'Đánh Giá' },
];

const OrderTracking = () => {
  const a = 1;
  console.log(a);

  return (
    <Container>
      <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#ffffff', marginTop: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button variant="text">Prev</Button>
          <Typography variant="body1">
            Mã Đơn Hàng: 2407070NVTU8RR | <span>ĐANG GIAO HÀNG</span>
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Stepper activeStep={3} alternativeLabel sx={{ mt: 5 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                {step.label}
                {step.date && (
                  <Typography variant="caption" display="block">
                    {step.date}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="body2">
            Ngày nhận hàng dự kiến từ <strong>11-07-2024</strong> đến <strong>12-07-2024</strong>
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Giao nhanh đúng hẹn: nhận Voucher ₫15.000 nếu đơn hàng được giao đến sau ngày
            13-07-2024. <a href="#more">Xem thêm</a>
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} disabled>
            Đã Nhận Hàng
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderTracking;
