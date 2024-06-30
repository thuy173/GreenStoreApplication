import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MatchingQuestion from './question/MatchingQuestion';
import OrderingQuestion from './question/OrderingQuestion';
import TrueFalseQuestion from './question/TrueFalseQuestion';
import FillBlankQuestion from './question/FillBlankQuestion';
import ComparisonQuestion from './question/ComparisonQuestion';
import ShortAnswerQuestion from './question/ShortAnswerQuestion';
import ComprehensionQuestion from './question/ComprehensionQuestion';
import MultipleChoiceQuestion from './question/MultipleChoiceQuestion';

const QuestionTypes = {
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
  MATCHING: 'matching',
  FILL_BLANK: 'fill_blank',
  COMPARISON: 'comparison_question',
  COMPREHENSION: 'comprehension_question',
  ORDERING: 'ordering_question',
  SHORT_ANSWER: 'short_answer',
};

const QuizHeader = ({ questionId, questionType, data, score }) => {
  const renderQuestion = () => {
    switch (questionType) {
      case QuestionTypes.MULTIPLE_CHOICE:
        return <MultipleChoiceQuestion data={data} />;
      case QuestionTypes.TRUE_FALSE:
        return <TrueFalseQuestion data={data} />;
      case QuestionTypes.FILL_BLANK:
        return <FillBlankQuestion data={data} />;
      case QuestionTypes.MATCHING:
        return <MatchingQuestion data={data} />;
      case QuestionTypes.COMPARISON:
        return <ComparisonQuestion data={data} />;
      case QuestionTypes.COMPREHENSION:
        return <ComprehensionQuestion data={data} />;
      case QuestionTypes.ORDERING:
        return <OrderingQuestion data={data} />;
      case QuestionTypes.SHORT_ANSWER:
        return <ShortAnswerQuestion data={data} />;

      default:
        return <Typography variant="h6">Không có câu hỏi</Typography>;
    }
  };

  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
      <Stack direction="column" spacing={1} maxWidth="80%" marginTop={-1.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight="bold" variant="caption text">
            ( {score}đ ) {data.prompt}
          </Typography>
        </Stack>

        {renderQuestion()}
      </Stack>

      <Stack direction="column" maxWidth="20%" marginTop={-1.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            ID:
          </Typography>
          <Typography variant="caption text">{questionId}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

QuizHeader.propTypes = {
  questionId: PropTypes.any,
  questionType: PropTypes.any,
  data: PropTypes.any,
  score: PropTypes.any,
};

export default QuizHeader;
