import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const TrueFalseCard = ({ data }) => {
  <Stack spacing={1}>
    <Typography variant="body1" fontWeight="bold">
      Câu hỏi:
    </Typography>
    {data.question.questionContentType === 'image' ? (
      <img src={data.question.questionContent} alt="Question" width={500} />
    ) : (
      <Typography variant="body1" component="span">
        {ReactHtmlParser(data.question.questionContent)}
      </Typography>
    )}
    <RadioGroup
      row
      aria-labelledby="controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      defaultValue={data.answer}
    >
      <FormControlLabel
        value="true"
        control={<Radio />}
        label="True"
        disabled={data.answer !== true}
      />
      <FormControlLabel
        value="false"
        control={<Radio />}
        label="False"
        disabled={data.answer !== false}
      />
    </RadioGroup>
  </Stack>;
};

TrueFalseCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TrueFalseCard;
