import React, { useState } from 'react';

import { Box, Grid, Button, Divider, Container, Typography, CardContent } from '@mui/material';

import OrderTracking from './tracking';

const PurchaseOrder = () => {
  const [openOrderTracking, setOpenOrderTracking] = useState(false);

  const handleOpenOrderTracking = () => {
    setOpenOrderTracking(true);
  };

  return (
    <>
      {!openOrderTracking ? (
        <Container>
          <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#ffffff', marginTop: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <img
                      src="path_to_image"
                      alt="Product"
                      style={{ width: 80, height: 80, marginRight: 16 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        Ethelgirl Thời Trang Hàn Quốc Thêu Áo Sơ Mi Tay Ngắn Nữ Quần Áo Thường Ngày
                        Tất Cả Trận Đấu Sọc Top
                      </Typography>
                      <Typography color="textSecondary">Phân loại hàng: Hồng,M</Typography>
                      <Typography>x1</Typography>
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
                    ₫260.000
                  </Typography>
                  <Typography variant="h6" color="error">
                    ₫143.000
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="h6" color="textPrimary">
                    Thành tiền: ₫128.700
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="body2" color="textSecondary">
                Contact the store if you encounter any problems.
              </Typography>
              <Box display="flex">
                <Button variant="contained" color="error" onClick={handleOpenOrderTracking}>
                  Cancel order
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        <OrderTracking />
      )}
    </>
  );
};

export default PurchaseOrder;
