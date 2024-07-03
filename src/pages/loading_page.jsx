import React from 'react';

import { Box } from '@mui/material';

import './loading.css';

const LoadingPage = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    {/* <CircularProgress size={60} /> */}
    <div className="cell">
      <div className="card">
        <span className="flower-loader">Loading…</span>
      </div>
    </div>
  </Box>
);

export default LoadingPage;
