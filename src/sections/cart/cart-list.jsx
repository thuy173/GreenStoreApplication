import { useState } from 'react';

import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Grid,
  Stack,
  Paper,
  Button,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function CartDetail() {
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(false);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Grid item container justifyContent="space-around" alignItems="center" mt={7}>
      <Paper elevation={3} style={{ padding: 28, marginBottom: 5 }}>
        <Stack direction="row" spacing={19} alignItems="center" justifyContent="space-around">
          <Grid item container>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
              label=""
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Product"
              style={{ width: 60, height: 60 }}
            />
            <Grid item xs ml={2}>
              <Typography variant="body1"> Orange fresh </Typography>
              <Typography variant="body2" color="text.secondary">
                Vàng
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="body1" fontWeight="bold">
              ₫4.900
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleDecrement} size="small">
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                size="small"
                inputProps={{ style: { textAlign: 'center', width: '30px' } }}
              />
              <IconButton onClick={handleIncrement} size="small">
                <Add />
              </IconButton>
            </Box>
            <Typography ml={2} variant="body2" color="error">
              Còn 6 sản phẩm
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" fontWeight="bold">
              ₫4.900
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text" color="error">
              Xóa
            </Button>
          </Grid>
        </Stack>
      </Paper>
    </Grid>
  );
}
