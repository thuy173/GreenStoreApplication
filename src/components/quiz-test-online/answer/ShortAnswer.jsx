import { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

const ShortAnswer = ({ solve, data, answerChoice }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  if (answerChoice === null) {
    return <small style={{ color: 'red' }}>*Học sinh không trả lời câu hỏi này.</small>;
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography
              type="text"
              sx={{ marginTop: '8px', fontWeight: 'bold', marginRight: '8px' }}
            >
              Đáp án của học sinh:
            </Typography>
            <Typography
              type="text"
              sx={{
                color: 'green',
                paddingTop: '8px',
                borderBottom: 'solid 1px',
                borderRadius: '5px',
              }}
            >
              {answerChoice}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="column" alignItems="start" spacing={2} marginTop="25px">
        <Typography
          variant="caption text"
          fontWeight="bold"
          color={answerChoice === solve ? 'green' : 'red'}
        >
          {showAnswer && (answerChoice === solve ? 'Chính xác' : 'Sai')}
        </Typography>{' '}
        <Typography
          type="text"
          sx={{ color: 'orange', marginTop: '8px', fontWeight: 'bold', marginRight: '8px' }}
        >
          {showAnswer && `Đáp án đúng: ${solve}`}
        </Typography>
        <Button onClick={toggleAnswer} variant="contained">
          {showAnswer ? 'Ẩn đáp án' : 'Đáp án'}
        </Button>
      </Stack>
    </>
  );
};

ShortAnswer.propTypes = {
  solve: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  answerChoice: PropTypes.any.isRequired,
};

export default ShortAnswer;
