import { useState, useEffect } from 'react';

import { Box, Grid, Stack, Avatar, Button, CardHeader, Typography } from '@mui/material';

import LoadingPage from 'src/pages/loading_page';
import ProfileServices from 'src/services/ProfileServices';

import AddressUser from '../address';
import InformationBase from '../information-base';

const InformationBaseView = () => {
  const userId = localStorage.getItem('uD');
  const [dataDetail, setDataDetail] = useState(null);
  const [choiceData] = useState([
    { categoryId: 1, categoryName: 'Information' },
    { categoryId: 2, categoryName: 'Address' },
  ]);
  const [selectedChange, setSelectedChange] = useState(
    localStorage.getItem('choice') || 'Information'
  );

  useEffect(() => {
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
    fetchData();
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
      return <AddressUser initialValues={dataDetail} />;
    }

    return null;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2.5}>
        <Stack sx={{ px: 3, py: 3, height: '100%' }}>
          <CardHeader
            avatar={<Avatar src={dataDetail?.avatarUrl} alt={dataDetail?.fullName} />}
            title={<Typography variant="h6">{dataDetail?.fullName}</Typography>}
          />

          <Box my={3}>
            <Stack spacing={2}>
              {choiceData.map((category) => (
                <Button
                  key={category.categoryId}
                  variant={selectedChange === category.categoryName ? 'text' : 'text'}
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
          backgroundColor: '#26643b',
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
