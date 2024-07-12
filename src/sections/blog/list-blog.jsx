import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Card, Grid, CardMedia, Typography, CardContent, useMediaQuery } from '@mui/material';

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
        <Grid item xs={3}>
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
        xs={9}
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
        <Grid item xs={3}>
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
    blogId: PropTypes.string,
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
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });
  const [blogData, setBlogData] = useState([]);

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
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

  return (
    <Box sx={{ px: 12, pt: 1 }}>
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
