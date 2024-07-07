import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import AddressServices from 'src/services/AddressServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';
// ----------------------------------------------------------------------

export default function AddAddressNew({ onLoadData, onClose }) {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const fetchProvinces = useCallback(async () => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/https://vapi.vnappmob.com/api/province'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProvinces(data.results);
    } catch (error) {
      console.error('Failed to fetch provinces:', error);
      showAlert(
        'error',
        'Failed to fetch provinces. Please check your network connection and try again.'
      );
    }
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  const handleAdd = async () => {
    try {
      const response = await AddressServices.addData({ province: selectedProvince });
      if (response && response.status === 200) {
        showAlert('success', 'Add address new successfully!');
        onLoadData();
        onClose();
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to add address:', error);
      showAlert('error', error.message || 'An error occurred!');
    }
  };

  return (
    <Stack pt={5}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="province-select-label">Province</InputLabel>
          <Select
            labelId="province-select-label"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            label="Province"
          >
            {provinces.map((province) => (
              <MenuItem key={province.province_id} value={province.province_name}>
                {province.province_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onClick={handleAdd}
          disabled={!selectedProvince}
        >
          Add new address
        </Button>
      </Grid>

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Stack>
  );
}

AddAddressNew.propTypes = {
  onLoadData: PropTypes.func,
  onClose: PropTypes.func,
};
