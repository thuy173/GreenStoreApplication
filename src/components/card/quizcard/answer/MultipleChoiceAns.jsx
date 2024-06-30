import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const MultipleChoiceAnswer = ({ data }) => {
  const [answers] = useState(data.answer);
  const [correctAnswers] = useState(data.correctAnswer.split(','));

  const numColumns = Math.ceil(answers.length / 2);

  return (
    <Grid container spacing={1}>
      {answers.map((answer) => (
        <Grid container spacing={1} item key={answer.id} xs={12 / numColumns}>
          <Stack direction="row">
            <FormControlLabel
              control={
                <Checkbox
                  value={answer.id}
                  checked={correctAnswers.includes(answer.id.toString())}
                  disabled={!correctAnswers.includes(answer.id.toString())}
                />
              }
              label={
                answer.answerContent.endsWith('.png') || answer.answerContent.endsWith('.jpg')
                  ? null
                  : ReactHtmlParser(answer.answerContent)
              }
            />
            {answer.answerContent.endsWith('.png') || answer.answerContent.endsWith('.jpg') ? (
              <img
                src={answer.answerContent}
                alt={answer.answerContent}
                style={{ maxWidth: 60, height: 'auto' }}
              />
            ) : null}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

MultipleChoiceAnswer.propTypes = {
  data: PropTypes.shape({
    answer: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        answerContent: PropTypes.string.isRequired,
      })
    ).isRequired,
    correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
      .isRequired,
  }).isRequired,
};

export default MultipleChoiceAnswer;
