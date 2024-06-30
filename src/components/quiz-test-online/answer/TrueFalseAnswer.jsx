import { useState } from 'react';
import PropTypes from 'prop-types';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack, Tooltip, Typography, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const TrueFalseAnswer = ({ solve, answerChoice }) => {
  const [answer, setAnswer] = useState(answerChoice);
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  if (answerChoice === null) {
    return <small style={{ color: 'red' }}>*Học sinh không trả lời câu hỏi này.</small>;
  }
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={answer}
          onChange={handleChange}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="True"
            disabled={answerChoice !== true}
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="False"
            disabled={answerChoice !== false}
          />
        </RadioGroup>
      </FormControl>
      <Stack direction="row" alignItems="start" spacing={2}>
        <Typography
          variant="caption text"
          fontWeight="bold"
          color={answerChoice === solve ? 'green' : 'red'}
        >
          {showAnswer && (answerChoice === solve ? 'Chính xác' : 'Sai')}
        </Typography>
        <Typography> {showAnswer && `--`} </Typography>
        <Typography
          type="text"
          sx={{ color: 'orange', marginTop: '8px', fontWeight: 'bold', marginRight: '8px' }}
        >
          {showAnswer && `Đáp án đúng: ${solve}`}
        </Typography>
        <Tooltip title={showAnswer ? 'Ẩn đáp án' : 'Đáp án'}>
          <IconButton aria-label="expand row" size="small" onClick={toggleAnswer}>
            {showAnswer ? <KeyboardArrowLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

TrueFalseAnswer.propTypes = {
  solve: PropTypes.bool.isRequired,
  answerChoice: PropTypes.any.isRequired,
};

export default TrueFalseAnswer;
