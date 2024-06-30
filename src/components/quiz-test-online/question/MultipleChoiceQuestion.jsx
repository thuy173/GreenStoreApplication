import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MultipleChoiceQuestion = ({ data }) => (
  <Stack direction="row" spacing={1} alignItems="center" paddingLeft={5}>
    {data.question.questionContentType === 'image' ? (
      <img src={data.question.questionContent} alt="Question" width={500} />
    ) : (
      <Typography variant="body1" component="span" fontWeight="medium">
        {ReactHtmlParser(data.question.questionContent)}
      </Typography>
    )}
  </Stack>
);

MultipleChoiceQuestion.propTypes = {
  data: PropTypes.any,
};

export default MultipleChoiceQuestion;
