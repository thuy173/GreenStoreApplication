import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Comprehension = ({ data }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography variant="body1" fontWeight="bold">
      Câu hỏi:
    </Typography>
    <Typography variant="body1" component="span">
      {ReactHtmlParser(data.question)}
    </Typography>
  </Stack>
);

Comprehension.propTypes = {
  data: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comprehension;
