import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ComprehensionAnswer = ({ data, solve, answerChoice }) => {
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
              <Typography variant="caption text">{ReactHtmlParser(answerChoice)}</Typography>
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
          {showAnswer && ReactHtmlParser(`Đáp án đúng: ${solve}`)}
        </Typography>
        <Button onClick={toggleAnswer} variant="contained">
          {showAnswer ? 'Ẩn đáp án' : 'Đáp án'}
        </Button>
      </Stack>
    </>
  );
};

ComprehensionAnswer.propTypes = {
  data: PropTypes.object.isRequired,
  solve: PropTypes.any.isRequired,
  answerChoice: PropTypes.any.isRequired,
};

export default ComprehensionAnswer;
