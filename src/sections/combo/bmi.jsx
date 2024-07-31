/* eslint-disable import/no-extraneous-dependencies */
import 'chart.js/auto';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AdviceIcon from '@mui/icons-material/Lightbulb';
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import ComboServices from 'src/services/ComboServices';

const BMICalculator = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = async () => {
    if (!height || !weight) return;

    const credentials = {
      height: height / 100,
      weight,
    };

    try {
      const response = await ComboServices.calculateBMI(credentials);
      if (response && response.status === 200) {
        setBMI(response.data.bmi.toFixed(2));
        setBMICategory(response.data.status);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Failed to calculate BMI:', error);
    }
  };

  const getBMICategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return '#FF6384';
      case 'normal':
        return '#36A2EB';
      case 'overweight':
        return '#FFCE56';
      case 'obese':
        return '#FF4500';
      default:
        return '#000';
    }
  };

  const data = {
    labels: ['Underweight', 'Normal weight', 'Overweight', 'Obese'],
    datasets: [
      {
        data: bmi
          ? [
              bmiCategory.toLowerCase() === 'underweight' ? bmi : 0,
              bmiCategory.toLowerCase() === 'normal' ? bmi : 0,
              bmiCategory.toLowerCase() === 'overweight' ? bmi : 0,
              bmiCategory.toLowerCase() === 'obese' ? bmi : 0,
            ]
          : [1, 1, 1, 1],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF4500'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF4500'],
      },
    ],
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" margin={4}>
      <Card
        sx={{
          display: 'flex',
          p: 4,
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" mb={2} color="#333">
            BMI Calculator
          </Typography>
          <Typography variant="body1" mb={4} color="#666">
            Enter the values and click the calculate button to get results.
          </Typography>
          <FormControl component="fieldset" margin="normal" fullWidth>
            <RadioGroup row value={gender}>
              <FormControlLabel
                control={
                  <Box
                    component="span"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ml: 1 }}
                    onClick={() => handleGenderChange('female')}
                  >
                    <FemaleIcon color={gender === 'female' ? 'success' : 'disabled'} />
                    <span>Female</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Box
                    component="span"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ml: 7 }}
                    onClick={() => handleGenderChange('male')}
                  >
                    <MaleIcon color={gender === 'male' ? 'success' : 'disabled'} />
                    <span>Male</span>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>

          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="5%"
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Typography variant="body2" ml={1}>
                    cm
                  </Typography>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#398c58',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#398c58',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Typography variant="body2" ml={1}>
                    kg
                  </Typography>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#398c58',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#398c58',
                  },
                },
              }}
            />
          </Stack>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={calculateBMI}
            sx={{
              marginTop: 5,
              backgroundColor: '#d6e5d8',
              color: '#398c58',
              '&:hover': { backgroundColor: '#398c58', color: '#fff' },
            }}
          >
            Calculate
          </Button>
        </CardContent>
        <Divider orientation="vertical" flexItem />

        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box textAlign="center">
            <Typography variant="h5" color="#333">
              Your results
            </Typography>
            <Box mt={2} mb={2}>
              <Doughnut data={data} />
            </Box>
            {bmi && (
              <>
                <Typography variant="h4" mt={2} mb={2} color={getBMICategoryColor(bmiCategory)}>
                  BMI = {bmi}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AdviceIcon />}
                  sx={{
                    mt: 2,
                    backgroundColor: '#4caf50',
                    '&:hover': {
                      backgroundColor: '#45a049',
                    },
                    borderRadius: 1,
                  }}
                >
                  Xem lời khuyên
                </Button>

                {/* <Typography variant="body1" color="#666">
                  A BMI between 18.5 and 24.9 is considered <strong>{bmiCategory}</strong>, reducing
                  the risk of weight-related health issues.
                </Typography> */}
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BMICalculator;