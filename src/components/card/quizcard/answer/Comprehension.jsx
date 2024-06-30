import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ComprehensionAns = ({ data }) => (
  <Grid container spacing={1}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="caption text" fontWeight="bold">
        Đáp án:
      </Typography>
      <Typography variant="caption text">{ReactHtmlParser(data.answer)}</Typography>
    </Stack>
  </Grid>
);

ComprehensionAns.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComprehensionAns;
