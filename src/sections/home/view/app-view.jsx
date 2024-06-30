import { useState, useEffect } from 'react';

import { Stack } from '@mui/material';

import CustomSnackbar from 'src/components/snackbar/snackbar';

import News from '../news';
import About from '../about';
import Banner from '../banner';
import ListMenu from '../list';

// ----------------------------------------------------------------------

export default function AppView() {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  useEffect(() => {
    const login = localStorage.getItem('accessToken') !== null;

    if (login) {
      showAlert('success', 'Login successful!');
    }
  }, []);
  
  return (
    <Stack sx={{ marginBottom: -10 }}>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <Banner />
      <ListMenu />
      <About />
      <News />
    </Stack>
  );
}
