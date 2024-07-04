import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

const icon = '/assets/icons/ic_cart.svg';

// ----------------------------------------------------------------------

export default function Cart() {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(localStorage.getItem('cartItemCount'));

  const handleOpen = () => {
    navigate('/cart');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCartItemCount(localStorage.getItem('cartItemCount'));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Badge badgeContent={cartItemCount} color="success">
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 38,
          height: 38,
          bgcolor: 'action.selected',
        }}
      >
        <img src={icon} alt="" width={90} />
      </IconButton>
    </Badge>
  );
}
