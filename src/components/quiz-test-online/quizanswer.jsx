import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import ShortAnswer from './answer/ShortAnswer';
import OrderingAnswer from './answer/OrderingAnswer';
import MatchingAnswer from './answer/MatchingAnswer';
import TrueFalseAnswer from './answer/TrueFalseAnswer';
import FillBlankAnswer from './answer/FillBlankAnswer';
import ComparisonAnswer from './answer/ComparisonAnswer';
import ComprehensionAnswer from './answer/ComprehensionAnswer';
import MultipleChoiceAnswer from './answer/MultipleChoiceAnswer';

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

const QuizAnswer = ({ questionType, data, solve, answerChoice }) => {
  switch (questionType) {
    case QuestionTypes.TRUE_FALSE:
      return <TrueFalseAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.MULTIPLE_CHOICE:
      return <MultipleChoiceAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.MATCHING:
      return <MatchingAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.FILL_BLANK:
      return <FillBlankAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.COMPARISON:
      return <ComparisonAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.COMPREHENSION:
      return <ComprehensionAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.ORDERING:
      return <OrderingAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    case QuestionTypes.SHORT_ANSWER:
      return <ShortAnswer data={data} solve={solve} answerChoice={answerChoice} />;
    default:
      return <Typography variant="h6">Không có đáp án</Typography>;
  }
};

QuizAnswer.propTypes = {
  questionType: PropTypes.any,
  data: PropTypes.any,
  solve: PropTypes.any,
  answerChoice: PropTypes.any,
};

export default QuizAnswer;
