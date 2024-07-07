import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  Stack,
  Button,
  Dialog,
  Divider,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import ProfileServices from 'src/services/ProfileServices';

import Label from 'src/components/label/label';
import CustomSnackbar from 'src/components/snackbar/snackbar';

import AddAddressNew from './view/add-address';
// ----------------------------------------------------------------------

export default function AddressUser({ initialValues, onLoadData }) {
  const userId = localStorage.getItem('uD');
  const [addresses] = useState(initialValues.address || []);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const handleOpenAdd = () => {
    setOpenAddDialog(true);
  };
  const handleCloseAdd = () => {
    setOpenAddDialog(false);
  };
  const handleUpdateProfile = async () => {
    if (!userId) {
      showAlert('error', 'Unable to update profile. Please try again later.');
      return;
    }

    try {
      const response = await ProfileServices.updateData(userId, addresses);
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
      <Grid item xs={6}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#d6e5d8',
            color: '#26643b',
            borderRadius: 1.4,
            '&:hover': {
              backgroundColor: '#26643b',
              color: '#d6e5d8',
            },
          }}
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
        >
          Add new address
        </Button>
      </Grid>
      <Divider>My address</Divider>

      <Stack px={4}>
        {addresses.map((addressObj) => (
          <React.Fragment key={addressObj.addressId}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="start"
                spacing={2}
                p={3}
              >
                <Typography variant="body1">{addressObj.address}</Typography>
                <Typography variant="body1">{addressObj.addressDetail}</Typography>
                {addressObj.isActive && <Label> Default</Label>}
              </Stack>
              <Stack>
                <Button
                  variant="text"
                  sx={{
                    color: '#26643b',
                    '&:hover': {
                      backgroundColor: '#f5fcf4',
                    },
                    '&:focus': {
                      backgroundColor: '#f5fcf4',
                      p: 0,
                    },
                  }}
                  onClick={handleUpdateProfile}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
      </Stack>
      {openAddDialog && (
        <Dialog open={openAddDialog} onClose={handleCloseAdd} fullWidth maxWidth="md">
          <DialogTitle>Add address new</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseAdd}
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
            <AddAddressNew onLoadData={onLoadData} onClose={handleCloseAdd} />
          </DialogContent>
        </Dialog>
      )}
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
  onLoadData: PropTypes.func,
  initialValues: PropTypes.shape({
    customerId: PropTypes.any,
    address: PropTypes.arrayOf(
      PropTypes.shape({
        addressId: PropTypes.number,
        address: PropTypes.string,
        addressDetail: PropTypes.string,
        isActive: PropTypes.bool,
      })
    ),
  }).isRequired,
};
