import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const OrderingQuestion = ({ data }) => (
  <>
    <Grid container spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body1" fontWeight="bold">
          Câu hỏi:
        </Typography>
        <Typography variant="body1" component="span">
          {ReactHtmlParser(data.question)}
        </Typography>
      </Stack>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          {data.content.map((item, index) => (
            <React.Fragment key={item.id}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                >{`${index + 1}. `}</Typography>
                {item.contentType === 'image' ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img width={100} src={item.content} alt={`Image ${item.id}`} />
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      fontSize: '1.2em',
                      paddingRight: '1.2rem',
                      paddingLeft: '1.2rem',
                      color: '#117860',
                      backgroundColor: '#a6f2eb',
                    }}
                  >
                    {ReactHtmlParser(item.content)}
                  </Paper>
                )}
              </Stack>
            </React.Fragment>
          ))}
        </Stack>
      </Grid>
    </Grid>
    <Stack direction="row" spacing={2} alignItems="center">
      {/* <Typography fontWeight="bold"> Đáp án: </Typography> */}
      {/* <Typography>{data.correctOrder.replace(/,/g, ' -> ')}</Typography> */}
    </Stack>
  </>
);

OrderingQuestion.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    correctOrder: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        contentType: PropTypes.oneOf(['text', 'image']).isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderingQuestion;
