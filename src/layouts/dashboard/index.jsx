import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header
        openNav={openNav}
        onCloseNav={() => setOpenNav(false)}
        onOpenNav={() => setOpenNav(true)}
      />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
      <Footer />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
