import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ShortAnswerQues = ({ data }) => (
  <>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body1" fontWeight="bold">
        Câu hỏi:
      </Typography>
      <Typography variant="body1" component="span">
        {ReactHtmlParser(data.question)}
      </Typography>
    </Stack>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body1" fontWeight="bold">
        Đáp án:
      </Typography>
      <Typography variant="body1" component="span">
        {ReactHtmlParser(data.answer)}
      </Typography>
    </Stack>
  </>
);

ShortAnswerQues.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShortAnswerQues;
