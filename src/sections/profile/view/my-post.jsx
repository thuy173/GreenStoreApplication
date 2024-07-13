import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Card,
  Grid,
  Stack,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
} from '@mui/material';

import BlogServices from 'src/services/BlogServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

// ----------------------------------------------------------------------

export default function MyPost() {
  const userId = localStorage.getItem('uD');
  const navigate = useNavigate();
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

  const handleOpenUpdate = (id) => {
    navigate(`/blog/update/${id}`);
  };

  return (
    <Stack pt={5}>
      <Grid container spacing={2}>
        {blogData.map((items) => (
          <React.Fragment key={items.blogId}>
            <Grid item xs={4} display="flex">
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardActionArea component={Link} to={`/blog/${items.blogId}`} sx={{ flex: 1 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={items.thumbnail}
                    alt={items.title}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      bgcolor: '#fff',
                      textDecoration: 'none',
                      color: 'inherit',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Typography
                        gutterBottom
                        component="div"
                        variant="h4"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                        }}
                      >
                        {items.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="div"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                        }}
                      >
                        {items.description}
                      </Typography>
                    </div>
                    <Typography variant="caption" color="textSecondary" component="div">
                      {items.createAt}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      handleOpenUpdate(items.blogId);
                    }}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </React.Fragment>
        ))}
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

MyPost.propTypes = {};
