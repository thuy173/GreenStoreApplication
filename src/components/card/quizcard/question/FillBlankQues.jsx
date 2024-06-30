import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const FillBlankQues = ({ data }) => {
  const { question, answer } = data;

  const renderQuestionWithBlanks = () => {
    let renderedQuestion = question;
    Object.keys(answer).forEach(blank => {
      const placeholderRegex = /<input>/g;
      renderedQuestion = renderedQuestion.replace(placeholderRegex, `<span style="color: red;">${answer[blank]}</span>`);
    });
    return renderedQuestion;
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body1" fontWeight="bold">
        Câu hỏi:
      </Typography>
      <Typography variant="caption text" dangerouslySetInnerHTML={{ __html: renderQuestionWithBlanks() }}/>
    </Stack>
  );
};

FillBlankQues.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.object.isRequired,
  }).isRequired,
};

export default FillBlankQues;
