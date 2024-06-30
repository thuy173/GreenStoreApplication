import React from 'react';

import { Box, CircularProgress } from '@mui/material';



const LoadingPage = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}
    >
        <CircularProgress size={60} />
    </Box>
);

export default LoadingPage;
