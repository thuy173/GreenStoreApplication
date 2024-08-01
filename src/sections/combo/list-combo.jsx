import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Grid, Container, Typography } from '@mui/material';

import ComboServices from 'src/services/ComboServices';

import ComboCard from 'src/components/card/combo-card';

const AdvicePaper = ({ advice, bmiCategory }) => (
  <Box
    style={{
      borderRadius: '20px',
      padding: '20px',
      background: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
      backgroundColor: '#f9f9f9',
    }}
  >
    <Typography variant="h6" gutterBottom>
      Advice:
    </Typography>
    <Typography variant="body1">{advice?.content}</Typography>
  </Box>
);

AdvicePaper.propTypes = {
  advice: PropTypes.object,
  bmiCategory: PropTypes.string,
};

const ComboSuggestions = ({ bmiStatus }) => {
  const [comboData, setComboData] = useState([]);
  const navigate = useNavigate();

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

  const handleComboClick = (combo) => {
    navigate(`/combo/detail`, {
      state: {
        comboId: combo.comboId,
        comboProducts: combo.comboProducts,
        comboName: combo.comboName,
        priceCombo: combo.price,
      },
    });
  };

  return (
    <Grid container spacing={2}>
      {comboData.map((combo) => {
        const firstProductImage = combo.comboProducts[0]?.products[0]?.productImages[0]?.imageUrl;
        return (
          <Grid item xs={12} sm={6} md={4} key={combo.comboId}>
            <ComboCard
              title={combo.comboName}
              description={combo.description}
              image={firstProductImage}
              onClick={() => handleComboClick(combo)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

ComboSuggestions.propTypes = {
  bmiStatus: PropTypes.string,
};

const ListCombo = ({ advice, bmiCategory }) => (
  <Container>
    <Grid container spacing={4} alignItems="center" mt={3} pl={2}>
      <Grid item xs={12} md={4}>
        <AdvicePaper advice={advice} bmiCategory={bmiCategory} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ComboSuggestions bmiStatus={advice.status} />
      </Grid>
    </Grid>
  </Container>
);
ListCombo.propTypes = {
  advice: PropTypes.object,
  bmiCategory: PropTypes.string,
};

export default ListCombo;
