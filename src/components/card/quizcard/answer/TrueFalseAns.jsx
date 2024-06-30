import { useState } from 'react';
import PropTypes from 'prop-types';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

const TrueFalseAnswer = ({ data }) => {
  const [answer] = useState(data.answer);

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        defaultValue={answer}
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label="True"
          disabled={answer !== true}
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="False"
          disabled={answer !== false}
        />
      </RadioGroup>
    </FormControl>
  );
};

TrueFalseAnswer.propTypes = {
  data: PropTypes.shape({
    answer: PropTypes.bool.isRequired,
  }),
};

export default TrueFalseAnswer;
