import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={9} sx={{ pt: 3, pb: 2 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Chưa có dữ liệu
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
