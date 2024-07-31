import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Box, Grid, Button, CardMedia, Container, Typography } from '@mui/material';

import ComboServices from 'src/services/ComboServices';

import ComboCard from 'src/components/card/combo-card';

const ListCombo = ({ advice, bmiCategory }) => (
  <Container>
    <Grid container spacing={4} alignItems="center" mt={6}>
      <Grid item xs={12} md={6}>
        <Header advice={advice} bmiCategory={bmiCategory} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ReviewAndImage />
      </Grid>
    </Grid>
    <MainContent bmiStatus={advice.status} />
  </Container>
);
ListCombo.propTypes = {
  advice: PropTypes.object,
  bmiCategory: PropTypes.string,
};

const Header = ({ advice, bmiCategory }) => (
  <Box justifyContent="center" alignItems="center" textAlign="center">
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
      <span style={{ color: '#78c850' }}>{bmiCategory}</span>
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
      {advice?.content}
    </Typography>
    <Button variant="contained" color="warning" sx={{ borderRadius: 20, paddingX: 4, mt: 4 }}>
      Shop now
    </Button>
  </Box>
);

Header.propTypes = {
  advice: PropTypes.object,
  bmiCategory: PropTypes.string,
};

const ReviewAndImage = () => (
  <Box sx={{ position: 'relative' }}>
    <CardMedia
      component="img"
      src="https://res.cloudinary.com/dmmk9racr/image/upload/v1721470962/uvu3jgwgz41x2piw7tgx.jpg"
      alt="Main dish"
      sx={{
        height: 300,
        borderRadius: '50%',
        border: '4px solid #fff',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      }}
    />
  </Box>
);

const MainContent = ({ bmiStatus }) => {
  const [comboData, setComboData] = useState([]);

  const fetchComboData = async () => {
    try {
      const response = await ComboServices.getByBMIStatus(bmiStatus);
      if (response?.data && response?.status === 200) {
        setComboData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchComboData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      {comboData.map((combo) => (
        <Grid item xs={12} md={4} key={combo.comboId}>
          <ComboCard
            title={combo.comboName}
            description={combo.description}
            calories={`${combo.calories ?? 'N/A'} kcal`}
            image="/path-to-your-image"
          />
        </Grid>
      ))}
    </Grid>
  );
};

MainContent.propTypes = {
  bmiStatus: PropTypes.string,
};

export default ListCombo;
