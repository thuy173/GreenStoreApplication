import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card, CardMedia, CardContent } from '@mui/material';

const MatchingQuestion = ({ data }) => (
    <Grid container spacing={1}>
      {data.aSide.map((aItem) => {
            const matchingBItem = data.bSide.find((bItem) => bItem.id === aItem.id);
            return (
              <React.Fragment key={aItem.id}>
                <Grid item xs={6}>
                  <Card>
                    {aItem.contentType === 'image' ? (
                      <CardMedia
                        style={{ width: 150 }}
                        component="img"
                        src={aItem.content}
                        alt={`Matching Image ${aItem.id}`}
                      />
                    ) : (
                      <CardContent>
                        <Typography>{aItem.content}</Typography>
                      </CardContent>
                    )}
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  {matchingBItem && matchingBItem.contentType === 'image' ? (
                    <Card>
                      <CardMedia
                        style={{ width: 150 }}
                        component="img"
                        src={matchingBItem.content}
                        alt={`Matching Image ${matchingBItem.id}`}
                      />
                    </Card>
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography>{matchingBItem ? matchingBItem.content : 'No data'}</Typography>
                      </CardContent>
                    </Card>
                  )}
                
                </Grid>
              </React.Fragment>
            );
          })}
    </Grid>
  );

MatchingQuestion.propTypes = {
  data: PropTypes.any,
};

export default MatchingQuestion;
