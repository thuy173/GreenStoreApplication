
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { clearMessage } from 'src/redux/actions/messageActions';


const AlertNotification = () => {
  const { message, open } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearMessage());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={message}>
        {message.content}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
