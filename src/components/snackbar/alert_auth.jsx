import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CLEAR_MESSAGE } from 'src/redux/actions/actionTypes';

import CustomSnackbar from './snackbar';


const SnackbarContainer = () => {
  const dispatch = useDispatch();
  const { message, open, severity } = useSelector((state) => state.message);

  const handleClose = () => {
    dispatch({ type: CLEAR_MESSAGE });
  };

  return (
    <CustomSnackbar
      open={open}
      onClose={handleClose}
      message={message}
      severity={severity}
    />
  );
};

export default SnackbarContainer;
