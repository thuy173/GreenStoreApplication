import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const ComboCard = ({ title, description, image, calories, onClick }) => (
  <Card
    onClick={onClick}
    sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, cursor: 'pointer' }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{ width: 100, height: 100, borderRadius: 1 }}
    />
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
        {description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {calories}
      </Typography>
    </CardContent>
  </Card>
);

ComboCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  calories: PropTypes.number,
  onClick: PropTypes.func,
};

export default ComboCard;
