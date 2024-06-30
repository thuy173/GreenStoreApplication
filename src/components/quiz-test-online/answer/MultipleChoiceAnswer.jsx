import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip, IconButton, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const MultipleChoiceAnswer = ({ solve, data, answerChoice }) => {
  const numColumns = Math.ceil(data.answer.length / 2);

  const selectedAnswerIds =answerChoice ? answerChoice.split(',').map((id) => id.trim()) : [];
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'];

  return (
    <>
      <Grid container spacing={1}>
        {data.answer.map((answer, index) => (
          <Grid container spacing={1} item key={answer.id} xs={12 / numColumns}>
            <Stack direction="row">
              <Typography
                sx={{
                  borderRadius: 4,
                  backgroundColor: '#FFF9D0',
                  display: 'inline-block',
                  minWidth: 'fit-content',
                  padding: '4px 9px',
                  margin: '15px',
                }}
                variant="caption"
              >
                {index + 1}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    value={answer.id}
                    checked={selectedAnswerIds.includes(answer.id.toString())}
                    disabled={!selectedAnswerIds.includes(answer.id.toString())}
                  />
                }
                label={
                  imageExtensions.some((ext) => answer.answerContent.endsWith(ext))
                    ? null
                    : ReactHtmlParser(answer.answerContent)
                }
              />
              {imageExtensions.some((ext) => answer.answerContent.endsWith(ext)) && (
                <img
                  src={answer.answerContent}
                  alt={answer.answerContent}
                  style={{ maxWidth: 60, height: 'auto' }}
                />
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" alignItems="start" spacing={2} marginTop="25px">
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

MultipleChoiceAnswer.propTypes = {
  solve: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  answerChoice: PropTypes.any,
};

export default MultipleChoiceAnswer;
