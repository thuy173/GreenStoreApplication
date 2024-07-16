import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  Dialog,
  Button,
  Typography,
  DialogContent,
  DialogActions,
} from '@mui/material';

const OrderSuccessDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        overflow: 'visible',
        paddingTop: '84px',
        borderRadius: '25px',
      },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '-75px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '155px',
        height: '155px',
        marginRight: 2,
        paddingTop: 1,
        backgroundColor: '#E0F7FA',
        borderRadius: '50%',
        zIndex: 1,
      }}
    >
      <Box
        component="img"
        src="/assets/images/main/verified.png"
        alt="success"
        sx={{
          width: '85%',
          height: '85%',
          objectFit: 'contain',
        }}
      />
    </Box>
    <DialogContent sx={{ textAlign: 'center', padding: '10px 15px', position: 'relative' }}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h3">Success!</Typography>
        <Typography variant="body1" mt={1}>
          Everything is OK, continue to the next step
        </Typography>
      </Stack>
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
      <Button
        onClick={onClose}
        variant="contained"
        sx={{
          backgroundColor: '#4FC3F7',
          color: '#fff',
          borderRadius: '30px',
          px: 10,
          py: 1.2,
          m: 2,
          '&:hover': {
            backgroundColor: '#1eb4eb',
          },
        }}
      >
        Continue
      </Button>
    </DialogActions>
  </Dialog>
);

OrderSuccessDialog.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
};
export default OrderSuccessDialog;
