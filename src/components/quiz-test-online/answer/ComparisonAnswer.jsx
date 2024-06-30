import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Button, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';

const ComparisonAnswer = ({ data, solve, answerChoice }) => {
  const [showSolve, setShowSolve] = useState(false);

  const toggleSolveVisibility = () => {
    setShowSolve(!showSolve);
  };

  // Providing a default empty array if answerChoice is null
  const normalizedAnswerChoice = answerChoice ?? [];

  const aSideArray = [data.aSide];
  const bSideArray = [data.bSide];
  let solveLetter = '';

  if (solve) {
    if (solve === '1') {
      solveLetter = 'A';
    } else if (solve === '2') {
      solveLetter = 'B';
    }
  }

  const gridSize = Math.ceil(Math.sqrt(aSideArray.length || 0));
  return (
    <Grid container spacing={1}>
      {aSideArray.map((item, index) => (
        <Grid item key={index} xs={12 / gridSize}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Checkbox disabled checked={normalizedAnswerChoice[index] === '1'} />
            {item.contentType === 'text' ? (
              <Typography variant="caption text">{ReactHtmlParser(item.content)}</Typography>
            ) : (
              <img src={item.content} alt={`${index + 1}`} style={{ width: 100, height: 100 }} />
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Checkbox disabled checked={normalizedAnswerChoice[index] === '2'} />
            {bSideArray[index].contentType === 'text' ? (
              <Typography variant="caption text">
                {ReactHtmlParser(bSideArray[index].content)}
              </Typography>
            ) : (
              <img
                src={bSideArray[index].content}
                alt={`${index + 1}`}
                style={{ width: 100, height: 100 }}
              />
            )}
          </Stack>

          {showSolve && solveLetter && (
            <Stack direction="column" alignItems="start" spacing={2}>
              <Typography
                variant="caption text"
                fontWeight="bold"
                color={normalizedAnswerChoice[index] === solve ? 'green' : 'red'}
              >
                {normalizedAnswerChoice[index] === solve ? 'Chính xác' : 'Sai'}
              </Typography>
              <Typography color="orange" variant="caption text" fontWeight="bold">
                Đáp án : {solveLetter}
              </Typography>
            </Stack>
          )}
        </Grid>
      ))}
      <Button variant="contained" onClick={toggleSolveVisibility}>
        {showSolve ? 'Ẩn đáp án' : 'Đáp án'}
      </Button>
    </Grid>
  );
};

ComparisonAnswer.propTypes = {
  solve: PropTypes.any.isRequired,
  data: PropTypes.object.isRequired,
  answerChoice: PropTypes.any.isRequired,
};

export default ComparisonAnswer;

