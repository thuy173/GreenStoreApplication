import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Comparison from './question/Comparison';
import MatchingQues from './question/MatchingQues';
import OrderingQues from './question/OrderingQues';
import TrueFalseQues from './question/TrueFalseQues';
import FillBlankQues from './question/FillBlankQues';
import Comprehension from './question/Comprehension';
import ShortAnswerQues from './question/ShortAnswer';
import MultipleChoiceQues from './question/MultipleChoiceQues';

const QuestionTypes = {
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
  MATCHING: 'matching',
  FILL_BLANK: 'fill_blank',
  COMPARISON: 'comparison_question',
  COMPREHENSION: 'comprehension_question',
  ORDERING: 'ordering_question',
  SHORTANSWER: 'short_answer',
};

const QuizHeader = ({ questionId, questionType, data }) => {
  const formatQuestionType = (inputString) => {
    const words = inputString.split('_');
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const formattedString = formattedWords.join(' ');
    return formattedString;
  };

  const renderQuestion = () => {
    switch (questionType) {
      case QuestionTypes.MULTIPLE_CHOICE:
        return <MultipleChoiceQues data={data} />;
      case QuestionTypes.TRUE_FALSE:
        return <TrueFalseQues data={data} />;
      case QuestionTypes.FILL_BLANK:
        return <FillBlankQues data={data} />;
      case QuestionTypes.MATCHING:
        return <MatchingQues data={data} />;
      case QuestionTypes.COMPARISON:
        return <Comparison data={data} />;
      case QuestionTypes.COMPREHENSION:
        return <Comprehension data={data} />;
      case QuestionTypes.ORDERING:
        return <OrderingQues data={data} />;
      case QuestionTypes.SHORTANSWER:
        return <ShortAnswerQues data={data} />;

      default:
        return <Typography variant="h6">Không có câu hỏi</Typography>;
    }
  };

  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
      <Stack direction="column" spacing={1} maxWidth="60%">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            ID:
          </Typography>
          <Typography variant="caption text">{questionId}</Typography>
        </Stack>

        {renderQuestion()}
      </Stack>

      <Stack direction="column" maxWidth="40%">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            Kiểu:
          </Typography>
          <Typography variant="caption text">{formatQuestionType(questionType)}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

QuizHeader.propTypes = {
  questionId: PropTypes.any,
  questionType: PropTypes.any,
  data: PropTypes.any,
};

export default QuizHeader;
