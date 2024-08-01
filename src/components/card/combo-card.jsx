import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardMedia, Typography, CardContent, CardActionArea } from '@mui/material';

const ComboCard = ({ title, description, image, onClick }) => (
  <Card onClick={onClick}>
    <CardActionArea>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

ComboCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default ComboCard;
