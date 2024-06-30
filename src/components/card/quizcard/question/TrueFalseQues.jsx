import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const TrueFalseQues = ({ data }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography variant="body1" fontWeight="bold">
      Câu hỏi:
    </Typography>
    {data.question.questionContentType === 'image' ? (
      <img src={data.question.questionContent} alt="Question" width={500} />
    ) : (
      <Typography variant="body1" component="span">
        {ReactHtmlParser(data.question.questionContent)}
      </Typography>
    )}
  </Stack>
);

TrueFalseQues.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.shape({
      questionContent: PropTypes.string.isRequired,
      questionContentType: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TrueFalseQues;
