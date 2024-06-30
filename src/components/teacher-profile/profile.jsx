import * as React from 'react';
// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Card, Stack, Button, TextField, Typography } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const items = [
  {
    id: 1,
    icon: <CloudUploadIcon />,
    title: 'Bài kiểm tra chương 1',
    description:
      'Toán lớp 1',
    imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
  },
  {
    id: 2,
    icon: <CloudUploadIcon />,
    title: 'Bài kiểm tra 15 phút',
    description: 'Lớp 1',
    imageLight: 'url("/static/images/templates/templates-images/mobile-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/mobile-dark.png")',
  },
  {
    id: 3,
    icon: <CloudUploadIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
  {
    id: 4,
    icon: <CloudUploadIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
  {
    id: 5,
    icon: <CloudUploadIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.This item could let users know the product is available on all platforms, such as web, mobile, This item could let users know the product is available on all platforms, such as web, mobile, and desktop.and desktop.This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
  {
    id: 6,
    icon: <CloudUploadIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
const truncateDescription = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)  }...`;
  }
  return text;
};

export default function MyProfile() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  // const selectedFeature = items[selectedItemIndex];
  const leftItems = items.filter((item) => item.id % 2 === 0);
  const rightItems = items.filter((item) => item.id % 2 !== 0);
  return (
    <Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ margin: 'auto', display: 'block', position: 'relative', width: 220 }}
      >
        <img
          src="/assets/images/avatars/avatar_12.jpg"
          alt="Preview"
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
          }}
        />
        <Button
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: 'transparent',
            '& .MuiButton-startIcon': {
              color: 'black',
              fontSize: '5.5rem',
            },
          }}
          component="label"
          startIcon={<DriveFileRenameOutlineIcon />}
        >
          <input type="file" hidden />
        </Button>
      </Stack>
      {/* input */}
      <Grid container spacing={3} sx={{ marginTop: 5, px: 5 }}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="full-name" required>
            Họ và tên
          </FormLabel>
          <OutlinedInput
            id="full-name"
            name="full-name"
            type="text"
            placeholder="Thầy Nguyễn Văn A"
            autoComplete="full name"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="dob" required>
            Ngày sinh
          </FormLabel>
          <OutlinedInput
            id="dob"
            name="dob"
            type="date"
            placeholder="Snow"
            autoComplete="dob"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="phone" required>
            Số điện thoại
          </FormLabel>
          <OutlinedInput
            id="phone"
            name="phone"
            type="phone"
            placeholder="0987654321"
            autoComplete="phone"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="nguyenvana12@gmail.com"
            autoComplete="email"
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="workPlace">Nơi làm việc</FormLabel>
          <OutlinedInput
            id="workPlace"
            name="workPlace"
            type="workPlace"
            placeholder="Hà Nội"
            autoComplete="workPlace"
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="description">Mô tả</FormLabel>
          <TextField
            id="outlined-basic"
            placeholder="Nhiều năm kinh nghiệm..."
            style={{ borderRadius: '2%' }}
            variant="outlined"
            name="description"
            multiline
            rows={4}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="state" required>
            State
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            type="state"
            placeholder="NY"
            autoComplete="State"
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>

      {/* card */}
      <Grid container spacing={6} sx={{ py: 5, px: 5 }}>
        <Grid item xs={12} md={6}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%' }}
          >
            {leftItems.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index * 2)}
                sx={{
                  p: 3,
                  width: '100%',
                  height: 150,
                  maxHeight: 150,
                  background: 'none',
                  backgroundColor: selectedItemIndex === index * 2 ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index * 2 ? 'primary.light' : 'grey.200';
                    }
                    return selectedItemIndex === index * 2 ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index ? 'primary.main' : 'grey.300';
                        }
                        return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography color="text.primary" variant="body2" fontWeight="bold">
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                    {truncateDescription(description, 150)}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%' }}
          >
            {rightItems.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index * 2 + 1)}
                sx={{
                  p: 3,
                  height: 150,
                  maxHeight: 150,
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index * 2 + 1 ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index * 2 + 1 ? 'primary.light' : 'grey.200';
                    }
                    return selectedItemIndex === index * 2 + 1 ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index ? 'primary.main' : 'grey.300';
                        }
                        return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography color="text.primary" variant="body2" fontWeight="bold">
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                    {truncateDescription(description, 150)}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
