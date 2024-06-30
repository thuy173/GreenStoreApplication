import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  // const { accessToken: currentToken } = useSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);

  // if (!currentToken) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Header openNav={openNav} onCloseNav={() => setOpenNav(false)} onOpenNav={() => setOpenNav(true)} />

        <Main>{children}</Main>
      </Box>
      <Footer />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
