import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

import { RouterLink } from '../../routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // const theme = useTheme();

  // const PRIMARY_LIGHT = theme.palette.primary.light;

  // const PRIMARY_MAIN = theme.palette.primary.main;

  // const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box
      component="img"
      src="/assets/images/favicon.svg" 
      sx={{ width: 135, height: 50, cursor: 'pointer', ...sx }}
    />
  );

  // const logo = (
  //   <Box
  //     ref={ref}
  //     component="div"
  //     sx={{
  //       width: 40,
  //       height: 40,
  //       display: 'inline-flex',
  //       ...sx,
  //     }}
  //     {...other}
  //   >
     
  //   </Box>
  // );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
