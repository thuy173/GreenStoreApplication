import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Stack, Button, TextField } from '@mui/material';

import ProfileServices from 'src/services/ProfileServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function AddressUser({ initialValues }) {
  const userId = localStorage.getItem('uD');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };
  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleUpdateProfile = async () => {
    if (!userId) {
      showAlert('error', 'Unable to add to cart. Please try again later.');
      return;
    }

    const credentials = {
      quantity: 1,
    };
    try {
      const response = await ProfileServices.updateData(userId, credentials);
      if (response && response.status === 200) {
        showAlert('success', 'Update information successfully!');
      } else {
        setAlert({
          message:
            response?.response?.data?.message || 'An error occurred. Please try again later!',
          severity: 'error',
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setAlert({
        message: error.message || 'An error occurred!',
        severity: 'error',
        isOpen: true,
      });
    }
  };

  return (
    <Stack pt={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} p={3}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={initialValues.email}
          name="email"
          fullWidth
        />
        <TextField
          id="phoneNumber"
          label="Phone number"
          variant="outlined"
          value={initialValues.phoneNumber}
          name="phoneNumber"
          fullWidth
        />
      </Stack>

      <Stack direction="column" justifyContent="center" alignItems="center" margin={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#d6e5d8',
            width: '150px',
            color: '#26643b',
            borderRadius: 1.4,
            '&:hover': {
              backgroundColor: '#26643b',
              color: '#d6e5d8',
            },
          }}
          onClick={() => handleUpdateProfile()}
        >
          Update
        </Button>
      </Stack>

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Stack>
  );
}

AddressUser.propTypes = {
  initialValues: PropTypes.shape({
    customerId: PropTypes.any,
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.arrayOf(
      PropTypes.shape({
        addressId: PropTypes.number,
        address: PropTypes.string,
        addressDetail: PropTypes.string,
        isActive: PropTypes.any,
      })
    ),
  }),
};
