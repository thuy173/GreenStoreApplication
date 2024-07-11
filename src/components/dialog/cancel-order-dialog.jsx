import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Stack,
  Dialog,
  Button,
  Typography,
  DialogContent,
  DialogActions,
} from '@mui/material';

const CancelOrderDialog = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        overflow: 'visible',
        borderRadius: '25px',
      },
    }}
  >
    <DialogContent>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
          paddingTop: 1,
        }}
      >
        <Box
          component="img"
          src="/assets/images/main/cancel.png"
          alt="success"
          sx={{
            width: '30%',
            height: '30%',
            objectFit: 'contain',
          }}
        />
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant="body1" mt={3} textAlign="center">
          Are you sure you want to cancel this order?
        </Typography>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Grid container spacing={2} justifyContent="center" alignItems="center" mb={1}>
        <Grid item xs={6}>
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            sx={{
              borderColor: '#81e0fc',
              color: '#42bbdd',
              borderRadius: '30px',
              px: 2,
              py: 1.2,
              '&:hover': {
                borderColor: '#81e0fc',
                backgroundColor: '#ebfaff',
              },
            }}
          >
            No
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={onConfirm}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#f07281',
              color: '#fff',
              borderRadius: '30px',
              px: 2,
              py: 1.2,
              '&:hover': {
                backgroundColor: '#eb5569',
              },
            }}
            autoFocus
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    </DialogActions>
  </Dialog>
);

CancelOrderDialog.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  onConfirm: PropTypes.any,
};
export default CancelOrderDialog;
