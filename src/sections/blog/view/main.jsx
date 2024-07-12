import { Grid } from '@mui/material';

import ListBlog from '../list-blog';

// ----------------------------------------------------------------------

export default function BlogMain() {
  return (
    <Grid container spacing={2}>
      <ListBlog />
    </Grid>
  );
}
