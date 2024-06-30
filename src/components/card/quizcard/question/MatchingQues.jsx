import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MatchingQues = ({ data }) => {
  const gridSize = Math.ceil(Math.sqrt(data.aSide?.length || 0));
  return (
    <Grid container spacing={1}>
      {data.aSide.map((item, index) => (
        <Grid item key={index} xs={12 / gridSize}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {`${index + 1}:`}
            </Typography>
            {item.contentType === 'text' ? (
              <Typography variant="caption text">{item.content}</Typography>
            ) : (
              <img src={item.content} alt={`${index + 1}`} style={{ width: 100, height: 100 }} />
            )}
            <Typography variant="caption text"> -&gt; </Typography>
            {data.bSide[index].contentType === 'text' ? (
              <Typography variant="caption text">{data.bSide[index].content}</Typography>
            ) : (
              <img
                src={data.bSide[index].content}
                alt={`${index + 1}`}
                style={{ width: 100, height: 100 }}
              />
            )}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

MatchingQues.propTypes = {
  data: PropTypes.any,
};

export default MatchingQues;
