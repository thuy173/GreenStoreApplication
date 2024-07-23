import { useState, useEffect } from 'react';

import Slider from '@mui/material/Slider';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Grid,
  Radio,
  Stack,
  styled,
  TextField,
  RadioGroup,
  Typography,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import ProductServices from 'src/services/ProductServices';
import CategoryServices from 'src/services/CategoryServices';

import ProductList from '../list-view';
import ProductListFilter from '../list-filter';

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

export default function ProductMain() {
  const [value, setValue] = useState(10);
  const [categoryData, setCategoryData] = useState([]);
  const [productFilterData, setProductFilterData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem('selectedCategory') || 'all'
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategoryData = async () => {
    try {
      const response = await CategoryServices.getData();
      if (response?.data && response?.status === 200) {
        setCategoryData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchProductFilterData = async (categoryId) => {
    try {
      const response = await CategoryServices.getDataById(categoryId);
      if (response?.data && response?.status === 200) {
        setProductFilterData(response.data.products);
        setFilteredProducts([]);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchProductsByPrice = async (minPrice, maxPrice) => {
    try {
      const response = await ProductServices.searchByPrice(minPrice, maxPrice, 0, 10);

      if (response?.data && response?.status === 200) {
        setFilteredProducts(response.data.content);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchProductsByName = async (name) => {
    try {
      const response = await ProductServices.searchByName(name, 0, 10);

      if (response?.data && response?.status === 200) {
        setFilteredProducts(response.data.content);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      const maxPrice = calculateValue(newValue);
      fetchProductsByPrice(0, maxPrice);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    fetchProductsByName(searchValue);
  };

  const maxPrice = calculateValue(value);

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

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    await fetchProductFilterData(categoryId);
  };

  // const handleCategoryChange = async (event) => {
  //   const categoryId = event.target.value;
  //   setSelectedCategory(categoryId);
  //   await fetchProductFilterData(categoryId);
  //   if (value) {
  //     const maxPrices = calculateValue(value);
  //     fetchProductsByPrice(0, maxPrices);
  //   }
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2.5}>
        <Stack sx={{ px: 6, py: 3, height: '100%' }}>
          <Box mt={3}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: '#52af77' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#dadada',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#757575',
                  },
                },
              }}
            />
          </Box>
          <Box my={3}>
            <Typography variant="h6">Category:</Typography>
            <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
              <FormControlLabel
                key="all"
                value="all"
                control={<Radio style={{ color: '#52af77' }} />}
                label="All"
              />
              {categoryData.map((category) => (
                <FormControlLabel
                  key={category.categoryId}
                  value={category.categoryId}
                  control={<Radio style={{ color: '#52af77' }} />}
                  label={category.categoryName}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">
              Maximum price:{' '}
              <span style={{ fontWeight: 'normal' }}>{valueLabelFormat(maxPrice)}</span>
            </Typography>
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
            <Typography variant="h6">Filter by Rating</Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={9.5}>
        <Stack sx={{ padding: 2, height: '100%', overflowY: 'auto' }}>
          {(!selectedCategory || selectedCategory === 'all') && filteredProducts.length === 0 && (
            <ProductList />
          )}
          {selectedCategory &&
            selectedCategory !== 'all' &&
            productFilterData &&
            filteredProducts.length === 0 && (
              <ProductListFilter productFilterData={productFilterData} />
            )}
          {filteredProducts.length > 0 && (
            <ProductListFilter productFilterData={filteredProducts} />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
