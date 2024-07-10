import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { Stack, Button, Backdrop, TextField, IconButton, CircularProgress } from '@mui/material';

import ProfileServices from 'src/services/ProfileServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function InformationBase({ initialValues }) {
  const userId = localStorage.getItem('uD');
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(initialValues.email || '');
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber || '');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (initialValues.fullName) {
      const [first, ...last] = initialValues.fullName.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
    }
  }, [initialValues.fullName]);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setAvatarPreview(reader.result);
        handleUpdateAvatar(imageFile);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleUpdateAvatar = async (imageFile) => {
    if (!userId) {
      showAlert('error', 'Unable to update avatar. Please try again later.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      if (imageFile) {
        formData.append('avatar', imageFile);
      }
      if (!imageFile && !initialValues.avatar) {
        showAlert('error', 'Hãy tải ảnh lên.');
        return;
      }
      const response = await ProfileServices.updateAvatar(userId, formData);
      if (response && response.status === 200) {
        showAlert('success', 'Avatar updated successfully!');
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to update avatar:', error);
      showAlert('error', error.message || 'An error occurred!');
    } finally {
      setLoading(false);
    }
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
        const newToken = response.data.token;

        localStorage.setItem('accessToken', newToken);
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
    <Stack pt={1}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ margin: 'auto', display: 'block', position: 'relative', width: 220 }}
      >
        <img
          src={avatarPreview ?? initialValues.avatar}
          alt=""
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            objectFit: 'contain',
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 10,
            background: 'transparent',
            '& .MuiButton-startIcon': {
              color: 'black',
              fontSize: '5.5rem',
            },
          }}
          component="label"
        >
          <FlipCameraIosIcon />
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </IconButton>
      </Stack>
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
      <Backdrop open={loading} style={{ color: '#fff', zIndex: 1400 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
    avatar: PropTypes.string,
  }),
};
