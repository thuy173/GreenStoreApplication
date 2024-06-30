import React from 'react';
import PropTypes from 'prop-types';

import { Portal } from '@mui/material';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SlideTransition = (props) => <Slide {...props} direction="left" />;

const CustomSnackbar = ({ open, onClose, message, severity }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
        <Portal>
            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    elevation={6}                    
                    onClose={handleClose}
                    severity={severity}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Portal>
    );
};

CustomSnackbar.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.func,
    message: PropTypes.any,
    severity: PropTypes.any
};

export default CustomSnackbar;
