import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Stack,
  Button,
  Dialog,
  Divider,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import AddressServices from 'src/services/AddressServices';

import Label from 'src/components/label/label';
import CustomSnackbar from 'src/components/snackbar/snackbar';

import AddAddressNew from './view/add-address';
import UpdateAddress from './view/update-address';
// ----------------------------------------------------------------------

export default function AddressUser({ initialValues, onLoadData }) {
  const [addresses, setAddresses] = useState(initialValues || []);
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    setAddresses(initialValues || []);
  }, [initialValues]);

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

  const handleOpenUpdate = (id) => {
    setOpenUpdateDialog(true);
    fetchData(id);
  };
  const handleCloseUpdate = () => {
    setOpenUpdateDialog(false);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await AddressServices.deleteData(addressId);
      if (response && response.status === 200) {
        showAlert('success', 'Delete address successfully!');
        onLoadData();
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
      showAlert('error', error.message || 'An error occurred!');
    }
  };
  const handleActiveAddress = async (addressId) => {
    try {
      const userId = localStorage.getItem('uD');

      const response = await AddressServices.active(userId, addressId, true);
      if (response && response.status === 200) {
        showAlert('success', 'Active address successfully!');
        onLoadData();
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to active address:', error);
      showAlert('error', error.message || 'An error occurred!');
    }
  };

  const handleSuccess = (severity, message) => {
    setTimeout(() => {
      setAlert({ isOpen: true, message, severity });
    }, 200);
  };

  const fetchData = async (id) => {
    try {
      const response = await AddressServices.getDataById(id);
      if (response?.data && response?.status === 200) {
        setDataDetail(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSuccess = (severity, message, updatedData) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((addr) => (addr.addressId === updatedData.addressId ? updatedData : addr))
    );
    setTimeout(() => {
      setAlert({ isOpen: true, message, severity });
    }, 200);
  };

  return (
    <Stack pt={5}>
      <Stack justifyContent="end" alignItems="end" pr={3.8}>
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
      </Stack>
      <Divider>My address</Divider>

      <Stack px={4}>
        {(addresses || []).map((addressObj) => (
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
                  onClick={() => handleOpenUpdate(addressObj.addressId)}
                >
                  Update
                </Button>
                {!addressObj.isActive && (
                  <>
                    <Button
                      variant="text"
                      sx={{
                        color: 'red',
                        '&:hover': {
                          backgroundColor: '#f5fcf4',
                        },
                        '&:focus': {
                          backgroundColor: '#f5fcf4',
                          p: 0,
                        },
                      }}
                      onClick={() => handleDeleteAddress(addressObj.addressId)}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => handleActiveAddress(addressObj.addressId)}>
                      Set active
                    </Button>
                  </>
                )}
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
            <AddAddressNew
              onSuccess={handleSuccess}
              onLoadData={onLoadData}
              handleClose={handleCloseAdd}
            />
          </DialogContent>
        </Dialog>
      )}
      {openUpdateDialog && (
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdate} fullWidth maxWidth="md">
          <DialogTitle>Update address</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseUpdate}
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
            <UpdateAddress
              addressObj={dataDetail}
              onSuccess={handleUpdateSuccess}
              onLoadData={onLoadData}
              handleClose={handleCloseUpdate}
            />
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
  onLoadData: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(
    PropTypes.shape({
      addressId: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      addressDetail: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ).isRequired,
};
