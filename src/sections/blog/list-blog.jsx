import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  CardMedia,
  Typography,
  CardContent,
  useMediaQuery,
} from '@mui/material';

import BlogServices from 'src/services/BlogServices';

import CustomSnackbar from 'src/components/snackbar/snackbar';

const ArticleCard = ({ article, isLargeScreen }) => (
  <Card
    component={Link}
    to={`/blog/${article.blogId}`}
    sx={{
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      bgcolor: '#fbf7f0',
      textDecoration: 'none',
      color: 'inherit',
    }}
  >
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      {!isLargeScreen && (
        <Grid item xs={4}>
          <CardMedia
            component="img"
            sx={{ height: '100%', objectFit: 'cover' }}
            image={article.thumbnail}
            alt={article.title}
          />
        </Grid>
      )}
      <Grid
        item
        xs={8}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <CardContent>
          <Typography
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
            {article.title}
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
            {article.description}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="div">
            {article.createAt}
          </Typography>
        </CardContent>
      </Grid>
      {isLargeScreen && (
        <Grid item xs={4}>
          <CardMedia
            component="img"
            sx={{ height: '100%', objectFit: 'cover' }}
            image={article.thumbnail}
            alt={article.title}
          />
        </Grid>
      )}
    </Grid>
  </Card>
);

ArticleCard.propTypes = {
  article: PropTypes.shape({
    blogId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    createAt: PropTypes.string,
  }).isRequired,
  isLargeScreen: PropTypes.bool.isRequired,
};

const ArticlesList = ({ blogData }) => {
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box sx={{ flexGrow: 1 }} mt={3}>
      <Grid container spacing={3}>
        {blogData.map((article, index) => (
          <Grid
            item
            xs={12}
            md={index === 0 ? 12 : 6}
            key={article.blogId}
            sx={{ display: 'flex', flex: 1 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <ArticleCard article={article} isLargeScreen={index !== 0 && isLargeScreen} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ArticlesList.propTypes = {
  blogData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ListBlog = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [blogData, setBlogData] = useState([]);

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };

  const fetchProductData = async () => {
    try {
      const response = await BlogServices.getData();
      if (response?.data && response?.status === 200) {
        setBlogData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleOpenCreate = () => {
    navigate('/blog/create');
  };

  useEffect(() => {
    const add = localStorage.getItem('addPost') === 'true';
    const update = localStorage.getItem('updatePost') === 'true';

    if (add) {
      showAlert('success', 'Post has been created successfully. Wait for approval!');
      localStorage.removeItem('addPost');
    }
    if (update) {
      showAlert('success', 'Post has been updated successfully. Wait for approval!');
      localStorage.removeItem('updatePost');
    }
  }, []);

  return (
    <Box sx={{ px: 12, pt: 1 }}>
      <Stack direction="row" justifyContent="end" alignItems="center">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            marginTop: 4,
            bgcolor: '#507c5c',
            borderColor: '#507c5c',
            color: '#d6e5d8',
            '&:hover': {
              backgroundColor: '#26643b',
              color: '#fff',
              borderColor: '#507c5c',
            },
          }}
          onClick={handleOpenCreate}
        >
          Create post
        </Button>
      </Stack>

      <ArticlesList blogData={blogData} />
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Box>
  );
};

export default ListBlog;
