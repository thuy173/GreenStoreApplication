import { Grid } from '@mui/material';

import BMICalculator from '../bmi';
// import ListCombo from '../list-combo';


// ----------------------------------------------------------------------

export default function ComboMain() {
  return (
    <Grid container spacing={2}>
      {/* <ListCombo /> */}
      <BMICalculator/>
    </Grid>
  );
}
