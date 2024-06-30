import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

const ComparisonAns = ({ data }) => {
  // Convert aSide and bSide to arrays
  const aSideArray = [data.aSide];
  const bSideArray = [data.bSide];
  let correctLetter = '';

  // Assuming data.correctAnswer is either 1 or 2
  if (data.correctAnswer === 1) {
    correctLetter = 'A';
  } else if (data.correctAnswer === 2) {
    correctLetter = 'B';
  }

  const gridSize = Math.ceil(Math.sqrt(aSideArray.length || 0));
  return (
    <Grid container spacing={1}>
      {aSideArray.map((item, index) => (
        <Grid item key={index} xs={12 / gridSize}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              A:
            </Typography>
            {item.contentType === 'text' ? (
              <Typography variant="caption text">{ReactHtmlParser(item.content)}</Typography>
            ) : (
              <img src={item.content} alt={`${index + 1}`} style={{ width: 100, height: 100 }} />
            )}

            <Box marginLeft={5} marginRight={5} />

            <Typography variant="caption text" fontWeight="bold">
              B:
            </Typography>
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

          <Typography variant="caption text" fontWeight="bold" marginTop={5}>
            Đáp án đúng: {correctLetter}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

ComparisonAns.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComparisonAns;
