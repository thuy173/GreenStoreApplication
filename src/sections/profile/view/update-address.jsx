import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Grid,
  Stack,
  Button,
  Select,
  Switch,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import AddressServices from 'src/services/AddressServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UpdateAddress({ onSuccess, addressObj,onLoadData,handleClose }) {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(addressObj.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(addressObj.district || '');
  const [selectedWard, setSelectedWard] = useState(addressObj.ward || '');
  const [addressDetail, setAddressDetail] = useState(addressObj.addressDetail || '');
  const [isActive, setIsActive] = useState(addressObj.isActive || false);

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const fetchProvinces = useCallback(async () => {
    try {
      const response = await fetch('https://vapi.vnappmob.com/api/province/', {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
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

  const fetchDistricts = useCallback(async (provinceId) => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
        {
          mode: 'cors',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDistricts(data.results);
    } catch (error) {
      console.error('Failed to fetch districts:', error);
      showAlert(
        'error',
        'Failed to fetch districts. Please check your network connection and try again.'
      );
    }
  }, []);

  const fetchWards = useCallback(async (districtId) => {
    try {
      const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`, {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setWards(data.results);
    } catch (error) {
      console.error('Failed to fetch wards:', error);
      showAlert(
        'error',
        'Failed to fetch wards. Please check your network connection and try again.'
      );
    }
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find((p) => p.province_name === selectedProvince);
      if (province) {
        fetchDistricts(province.province_id);
      }
      setSelectedDistrict('');
      setSelectedWard('');
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince, fetchDistricts, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find((d) => d.district_name === selectedDistrict);
      if (district) {
        fetchWards(district.district_id);
      }
      setSelectedWard('');
      setWards([]);
    }
  }, [selectedDistrict, fetchWards, districts]);

  // Ensure districts are fetched based on initial province
  useEffect(() => {
    if (addressObj.province && provinces.length > 0) {
      const province = provinces.find((p) => p.province_name === addressObj.province);
      if (province) {
        fetchDistricts(province.province_id);
      }
    }
  }, [addressObj.province, fetchDistricts, provinces]);

  // Ensure wards are fetched based on initial district
  useEffect(() => {
    if (addressObj.district && districts.length > 0) {
      const district = districts.find((d) => d.district_name === addressObj.district);
      if (district) {
        fetchWards(district.district_id);
      }
    }
  }, [addressObj.district, fetchWards, districts]);

  const handleUpdate = async () => {
    const payload = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      addressDetail,
      isActive,
    };
    try {
      const response = await AddressServices.updateData(addressObj.addressId, payload);
      if (response && response.status === 200) {
        const updatedData = { ...addressObj, ...payload };
        onSuccess('success', 'Update address successfully!', updatedData);
        onLoadData();
        handleClose();
      } else {
        showAlert(
          'error',
          response?.response?.data?.message || 'An error occurred. Please try again later!'
        );
      }
    } catch (error) {
      console.error('Failed to update address:', error);
      showAlert('error', error.message || 'An error occurred!');
    }
  };

  return (
    <Stack pt={1}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <FormControl fullWidth>
          <InputLabel id="province-select-label">Province</InputLabel>
          <Select
            labelId="province-select-label"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            label="Province"
            MenuProps={MenuProps}
          >
            {provinces.map((province) => (
              <MenuItem key={province.province_id} value={province.province_name}>
                {province.province_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="district-select-label">District</InputLabel>
          <Select
            labelId="district-select-label"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            label="District"
            MenuProps={MenuProps}
            disabled={!selectedProvince}
          >
            {districts.map((district) => (
              <MenuItem key={district.district_id} value={district.district_name}>
                {district.district_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="ward-select-label">Ward</InputLabel>
          <Select
            labelId="ward-select-label"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            label="Ward"
            MenuProps={MenuProps}
            disabled={!selectedDistrict}
          >
            {wards.map((ward) => (
              <MenuItem key={ward.ward_id} value={ward.ward_name}>
                {ward.ward_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center" pt={3}>
        <TextField
          id="addressDetail"
          label="Address detail"
          variant="outlined"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          name="addressDetail"
          fullWidth
        />
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center" pt={3}>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              name="isActive"
              color="primary"
            />
          }
          label="Is Active"
        />
      </Stack>
      <Grid item xs={6} mt={4}>
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
          onClick={handleUpdate}
          disabled={!selectedProvince || !selectedDistrict || !selectedWard}
        >
          Update address
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

UpdateAddress.propTypes = {
  onSuccess: PropTypes.func,
  onLoadData: PropTypes.func,
  handleClose: PropTypes.func,
  addressObj: PropTypes.shape({
    addressId: PropTypes.number,
    province: PropTypes.string,
    district: PropTypes.string,
    ward: PropTypes.string,
    addressDetail: PropTypes.string,
    isActive: PropTypes.bool,
  }).isRequired,
};
