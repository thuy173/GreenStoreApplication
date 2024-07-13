import { useState, useEffect } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Grid, Stack, Avatar, Button, CardHeader, Typography } from '@mui/material';

import LoadingPage from 'src/pages/loading_page';
import ProfileServices from 'src/services/ProfileServices';
import AddressServices from 'src/services/AddressServices';

import PurchaseOrder from 'src/sections/order/view/detail';

import MyPost from './my-post';
import AddressUser from '../address';
import InformationBase from '../information-base';

const InformationBaseView = () => {
  const userId = localStorage.getItem('uD');
  const [dataDetail, setDataDetail] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [choiceData] = useState([
    { categoryId: 1, categoryName: 'Information', icon: <InfoIcon /> },
    { categoryId: 2, categoryName: 'Address', icon: <HomeIcon /> },
    { categoryId: 3, categoryName: 'Purchase Order', icon: <ShoppingCartIcon /> },
    { categoryId: 4, categoryName: 'My post', icon: <LibraryBooksIcon /> },
  ]);
  const [selectedChange, setSelectedChange] = useState(
    localStorage.getItem('choice') || 'Information'
  );

  const fetchData = async () => {
    try {
      const response = await ProfileServices.getDataById(userId);
      if (response?.data && response?.status === 200) {
        setDataDetail(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllAddressData = async () => {
    try {
      const response = await AddressServices.getData();
      if (response?.data && response?.status === 200) {
        setAddressData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllAddressData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleChange = async (categoryName) => {
    setSelectedChange(categoryName);
    localStorage.setItem('choice', categoryName);
  };

  const renderContent = () => {
    if (!dataDetail) {
      return <LoadingPage />;
    }

    if (selectedChange === 'Information') {
      return <InformationBase initialValues={dataDetail} />;
    }

    if (selectedChange === 'Address') {
      return <AddressUser initialValues={addressData} onLoadData={fetchAllAddressData} />;
    }
    if (selectedChange === 'Purchase Order') {
      return <PurchaseOrder />;
    }
    if (selectedChange === 'My post') {
      return <MyPost />;
    }

    return null;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2.5}>
        <Stack sx={{ px: 3, py: 2, height: '100%' }}>
          <CardHeader
            avatar={<Avatar src={dataDetail?.avatar} alt={dataDetail?.fullName} />}
            title={<Typography variant="h6">{dataDetail?.fullName}</Typography>}
          />

          <Box ml={3} mt={5}>
            <Stack spacing={2} justifyContent="flex-start" alignItems="flex-start">
              {choiceData.map((category) => (
                <Button
                  key={category.categoryId}
                  variant="text"
                  startIcon={category.icon}
                  onClick={() => handleChange(category.categoryName)}
                  sx={{
                    color: selectedChange === category.categoryName ? '#26643b' : '#3b413a',
                    '&:hover': {
                      backgroundColor: '#f5fcf4',
                      borderColor: '#3b413a',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#f5fcf4',
                      borderColor: '#3b413a',
                    },
                  }}
                >
                  {category.categoryName}
                </Button>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Box
        sx={{
          width: '1px',
          backgroundColor: '#e1eae5',
        }}
      />
      <Grid item xs={12} sm={9.4}>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          {renderContent()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InformationBaseView;
