import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

const OrderingQues = ({ data }) => (
  <>
    <Grid container spacing={1}>
      <Typography variant="body1" fontWeight="bold">
        {ReactHtmlParser(data.question)}
      </Typography>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
          {data.content.map((item, index) => (
            <React.Fragment key={item.id}>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" component="div" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
                  {index + 1}:
                </Typography>
              </Box>
              {item.contentType === 'image' ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img width={100} src={item.content} alt={`Image ${item.id}`} />
              ) : (
                <Typography variant="body1" component="div">
                  {ReactHtmlParser(item.content)}
                </Typography>
              )}
              {index !== data.content.length - 1 && (
                <Divider orientation="vertical" flexItem style={{ margin: '0 0.5rem' }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Grid>
    </Grid>
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography fontWeight="bold"> Đáp án: </Typography>
      <Typography>{data.correctOrder.replace(/,/g, ' -> ')}</Typography>
    </Stack>
  </>
);

OrderingQues.propTypes = {
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

export default OrderingQues;
