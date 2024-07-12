import { useState } from 'react';

import { Grid, Stack, Paper, Button, Checkbox, Typography, FormControlLabel } from '@mui/material';

import CustomSnackbar from 'src/components/snackbar/snackbar';

export default function ListBlog() {
  const [alert, setAlert] = useState({ message: null, severity: 'success', isOpen: false });

  const handleCloseAlert = () => {
    setAlert({ message: null, severity: 'success', isOpen: false });
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      <Paper elevation={3} style={{ padding: 10, marginBottom: 8, marginTop: 60, width: '90%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Grid item container pl={2}>
            <FormControlLabel control={<Checkbox />} label="" />
            <Grid item mt={1} ml={4}>
              <Typography variant="body1">Product</Typography>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" spacing={12}>
            <Grid item pl={12}>
              <Typography variant="body1">Price</Typography>
            </Grid>
            <Grid item>
              <Typography ml={2} variant="body1">
                Quantity
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Amount</Typography>
            </Grid>
          </Grid>
          <Grid item mr={2}>
            <Button variant="text" color="error">
              Action
            </Button>
          </Grid>
        </Stack>
      </Paper>

      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Stack>
  );
}
