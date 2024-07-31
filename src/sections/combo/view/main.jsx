import { Grid } from '@mui/material';

import BMICalculator from '../bmi';
import ComboDetail from './combo-detail';
// import ListCombo from '../list-combo';

// ----------------------------------------------------------------------

export default function ComboMain() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <BMICalculator />
      {/* <ListCombo /> */}
      <ComboDetail/>
    </Grid>
  );
}
