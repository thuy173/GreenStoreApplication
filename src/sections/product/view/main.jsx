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
  Pagination,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import ProductServices from 'src/services/ProductServices';
import CategoryServices from 'src/services/CategoryServices';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchFilterProduct = async (
    name,
    minPrice = 0,
    maxPrice,
    categoryName,
    page = 0,
    size = 12,
    sort = 'asc'
  ) => {
    try {
      const response = await ProductServices.searchProduct(
        name,
        minPrice,
        maxPrice,
        categoryName,
        page,
        size,
        sort
      );
      if (response?.data && response?.status === 200) {
        setProductFilterData(response.data.content);
        setTotalPages(response.data.totalPages);
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

  useEffect(() => {
    const maxPrice = calculateValue(value);
    if (selectedCategory === 'all' || searchTerm || value !== 10) {
      fetchFilterProduct(searchTerm, 0, maxPrice, selectedCategory, currentPage - 1);
    } else {
      setProductFilterData(null);
    }
  }, [value, searchTerm, selectedCategory, currentPage]);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, values) => {
    setCurrentPage(values);
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
                  value={category.categoryName}
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
          {productFilterData ? (
            <>
              <ProductListFilter productFilterData={productFilterData} />
              <Pagination
                shape="rounded"
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="success"
                sx={{ mt: 2, alignSelf: 'center' }}
              />
            </>
          ) : (
            <Typography>No products found.</Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
