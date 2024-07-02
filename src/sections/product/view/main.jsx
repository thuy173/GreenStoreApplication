import { useState } from 'react';

import Slider from '@mui/material/Slider';
import { Box, Grid, Stack, styled, Typography } from '@mui/material';

import ProductList from '../list-view';
// ----------------------------------------------------------------------

function valueLabelFormat(value) {
  const units = ['$'];
  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1000 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1000;
  }

  return `${scaledValue.toFixed(1)} ${units[unitIndex]}`;
}

function calculateValue(value) {
  return 10 + value;
}

function filterProducts(products, maxPrice) {
  return products.filter((product) => product.price <= maxPrice);
}

export default function ProductMain() {
  const [value, setValue] = useState(10);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  const maxPrice = calculateValue(value);
  // const filteredProducts = filterProducts(product, maxPrice);
  console.log(filterProducts);

  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2.5}>
        <Stack sx={{ padding: 2, height: '100%' }}>
          <Box mb={2}>
            <Typography variant="h6">Phân loại sản phẩm</Typography>
            {/* Thêm nội dung phân loại sản phẩm ở đây */}
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Giá tối đa: {valueLabelFormat(maxPrice)}</Typography>
            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <PrettoSlider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  scale={calculateValue}
                  getAriaValueText={valueLabelFormat}
                  aria-labelledby="non-linear-slider"
                />
              </Stack>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6">Lọc đánh giá</Typography>
            {/* Thêm nội dung lọc đánh giá ở đây */}
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={9.5}>
        <Stack sx={{ padding: 2, height: '100%', overflowY: 'auto' }}>
          <ProductList />
        </Stack>
      </Grid>
    </Grid>
  );
}
