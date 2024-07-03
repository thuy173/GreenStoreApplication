import { useState } from 'react';

import { Stack } from '@mui/material';

import CustomSnackbar from 'src/components/snackbar/snackbar';

import Banner from '../banner';
import AboutHome from '../about';
import ProductList from '../product';
import CategoryHome from '../category';

// ----------------------------------------------------------------------

export default function AppView() {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  return (
    <Stack sx={{ marginBottom: -10 }}>
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <Banner />
      <CategoryHome />
      <ProductList />
      <AboutHome />
    </Stack>
  );
}
