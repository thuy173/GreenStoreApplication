import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { logOut } from 'src/redux/actions/authActions';
import { clearLocalStorage } from 'src/services/agent';
import ProfileServices from 'src/services/ProfileServices';
import { SET_MESSAGE } from 'src/redux/actions/actionTypes';
import { selectIsLoggedIn } from 'src/redux/selectors/authSelector';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

// ----------------------------------------------------------------------
export const setMessage = (message, severity = 'success') => ({
  type: SET_MESSAGE,
  payload: { message, severity },
});

export default function AccountPopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = localStorage.getItem('uD');
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    try {
      clearLocalStorage();
      dispatch(logOut(navigate));
      dispatch(setMessage('Logged out successfully!', 'success'));
      navigate('/');
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(setMessage(message, 'error'));
    }
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleRegister = () => {
    handleClose();
    navigate('/register');
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/profile');
  };

  const fetchData = async () => {
    try {
      const response = await ProfileServices.getDataById(userId);
      if (response?.data && response?.status === 200) {
        setUserData(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={userData?.avatar}
          alt={userData?.fullName}
          sx={{
            width: 42,
            height: 42,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userData?.fullName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {isLoggedIn ? (
          <>
            <Box sx={{ my: 1.5, px: 2 }}>
              <Typography variant="subtitle2" noWrap>
                {userData?.fullName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {userData?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={handleProfileClick}>
                {option.label}
              </MenuItem>
            ))}

            <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

            <MenuItem
              disableRipple
              disableTouchRipple
              onClick={handleLogout}
              sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              disableRipple
              disableTouchRipple
              onClick={handleLogin}
              sx={{ typography: 'body2', color: 'success.main', py: 1.5 }}
            >
              Login
            </MenuItem>
            <MenuItem
              disableRipple
              disableTouchRipple
              onClick={handleRegister}
              sx={{ typography: 'body2', color: 'default.main', py: 1.5 }}
            >
              Register
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}
