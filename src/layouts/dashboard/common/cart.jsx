import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

const icon = '/assets/icons/ic_cart.svg';

// ----------------------------------------------------------------------

export default function Cart() {
  return (
    <IconButton
      // onClick={handleOpen}
      sx={{
        width: 38,
        height: 38,
        bgcolor: 'action.selected',
      }}
    >
      <img src={icon} alt="" width={90} />
    </IconButton>
  );
}
