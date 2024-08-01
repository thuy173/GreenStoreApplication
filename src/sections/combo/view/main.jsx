import { Grid } from '@mui/material';

import BMICalculator from '../bmi';

// ----------------------------------------------------------------------

export default function ComboMain() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <BMICalculator />
    </Grid>
  );
}
