import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Stack, Button, TextField } from '@mui/material';

import ProfileServices from 'src/services/ProfileServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function InformationBase({ initialValues }) {
  const userId = localStorage.getItem('uD');

  // Split the full name into first name and last name
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(initialValues.email || '');
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber || '');

  useEffect(() => {
    if (initialValues.fullName) {
      const [first, ...last] = initialValues.fullName.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
    }
  }, [initialValues.fullName]);

  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleUpdateProfile = async () => {
    if (!userId) {
      showAlert('error', 'Unable to update profile. Please try again later.');
      return;
    }

    const updatedProfileData = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    try {
      const response = await ProfileServices.updateData(userId, updatedProfileData);
      if (response && response.status === 200) {
        showAlert('success', 'Profile updated successfully!');
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      showAlert('error', error.message || 'An error occurred!');
    }
  };

  return (
    <Stack pt={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} p={3}>
        <TextField
          id="firstName"
          label="First name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          fullWidth
        />
        <TextField
          id="lastName"
          label="Last name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          fullWidth
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} p={3}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          fullWidth
        />
        <TextField
          id="phoneNumber"
          label="Phone number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
          onClick={handleUpdateProfile}
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

InformationBase.propTypes = {
  initialValues: PropTypes.shape({
    customerId: PropTypes.any,
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
