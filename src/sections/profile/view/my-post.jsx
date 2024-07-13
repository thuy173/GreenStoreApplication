import React, { useState, useEffect } from 'react';

import { Stack, Button, Divider, Typography } from '@mui/material';

import BlogServices from 'src/services/BlogServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function MyPost() {
  const userId = localStorage.getItem('uD');
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [blogData, setBlogData] = useState([]);

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const fetchData = async () => {
    try {
      const response = await BlogServices.getDataByCustomerId(userId);
      if (response?.data && response?.status === 200) {
        setBlogData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Stack pt={5}>
      <Stack px={4}>
        {blogData.map((items) => (
          <React.Fragment key={items.blogId}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="start"
                spacing={2}
                p={3}
              >
                <Typography variant="body1">{items.title}</Typography>
                <Typography variant="body1">{items.description}</Typography>
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
                  //   onClick={() => handleOpenUpdate(addressObj.addressId)}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
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

MyPost.propTypes = {};
