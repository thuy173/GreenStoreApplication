import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import ComparisonAns from './answer/ComparisonAns';
import TrueFalseAnswer from './answer/TrueFalseAns';
import ComprehensionAns from './answer/Comprehension';
import MultipleChoiceAnswer from './answer/MultipleChoiceAns';

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

const QuizAnswer = ({ questionType, data }) => {
  switch (questionType) {
    case QuestionTypes.TRUE_FALSE:
      return <TrueFalseAnswer data={data} />;
    case QuestionTypes.MULTIPLE_CHOICE:
      return <MultipleChoiceAnswer data={data} />;
    case QuestionTypes.MATCHING:
      return null;
    case QuestionTypes.FILL_BLANK:
      return null;
    case QuestionTypes.COMPARISON:
      return <ComparisonAns data={data} />;
    case QuestionTypes.COMPREHENSION:
      return <ComprehensionAns data={data} />;
    case QuestionTypes.ORDERING:
      return null;
    case QuestionTypes.SHORTANSWER:
      return null;
    default:
      return <Typography variant="h6">Không có đáp án</Typography>;
  }
};

QuizAnswer.propTypes = {
  questionType: PropTypes.any,
  data: PropTypes.any,
};

export default QuizAnswer;
