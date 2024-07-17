import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, Typography, IconButton, DialogTitle, DialogContent } from '@mui/material';

import VoucherServices from 'src/services/VoucherServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

const VoucherDialog = ({ open, onClose, totalOrderAmount, onVoucherSelect }) => {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [voucherData, setVoucherData] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleSelectVoucher = (voucher) => {
    if (totalOrderAmount > voucher.minOrderAmount) {
      setSelectedVoucher(voucher.voucherId);
      onVoucherSelect({ voucherId: voucher.voucherId, discount: voucher.discount });
    } else {
      setAlert({
        message: `Total order amount must be greater than ${voucher.minOrderAmount} to use this voucher.`,
        severity: 'error',
        isOpen: true,
      });
    }
  };

  const selectInitialVoucher = (vouchers) => {
    const validVoucher = vouchers.find(voucher => totalOrderAmount > voucher.minOrderAmount);
    if (validVoucher) {
      setSelectedVoucher(validVoucher.voucherId);
      onVoucherSelect({ voucherId: validVoucher.voucherId, discount: validVoucher.discount });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await VoucherServices.getData();
        if (response?.data && response?.status === 200) {
          setVoucherData(response.data);
          selectInitialVoucher(response.data);
        } else {
          console.error(response ?? 'Unexpected response structure');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalOrderAmount]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            overflow: 'visible',
            borderRadius: '25px',
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Voucher</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {voucherData.map((voucher) => (
            <Box
              key={voucher.voucherId}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: selectedVoucher === voucher.voucherId ? '#f5fcf4' : '#fafafa',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectVoucher(voucher)}
            >
              <Box sx={{ flexGrow: 1, ml: 2 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontWeight: selectedVoucher === voucher.voucherId ? 'bold' : 'normal' }}
                >
                  {`Giảm ${voucher.discount}% - Đơn Tối Thiểu ${voucher.minOrderAmount}$`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  HSD: 31.07.2024 - Điều Kiện
                </Typography>
                <Typography variant="caption" color="#26643b">
                  Mua thêm 85k để sử dụng Voucher
                </Typography>
              </Box>
              {selectedVoucher === voucher.voucherId && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#26643b',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✓
                </Box>
              )}
            </Box>
          ))}
        </DialogContent>
      </Dialog>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

VoucherDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  totalOrderAmount: PropTypes.any,
  onVoucherSelect: PropTypes.func,
};

export default VoucherDialog;
