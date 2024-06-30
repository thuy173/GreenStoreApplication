import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Link from 'src/components/link';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { register } from '../../redux/actions/authActions';

// ----------------------------------------------------------------------

const RegisterView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password, phoneNumber };
    dispatch(register(userData, navigate));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="firstName"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#dadada',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: '#757575',
              },
            },
          }}
        />

        <TextField
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#dadada',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: '#757575',
              },
            },
          }}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#dadada',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: '#757575',
              },
            },
          }}
        />
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#dadada',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: '#757575',
              },
            },
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#dadada',
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: '#757575',
              },
            },
          }}
        />
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleRegister}
      >
        Register
      </Button>
    </>
  );

  return (
    <Stack
      sx={{
        height: 1,
        backgroundImage:
          'url(https://res.cloudinary.com/dmmk9racr/image/upload/v1719675397/h1slide2_qwcrro.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Stack
          sx={{
            p: 2,
            width: 1,
            maxWidth: 480,
            gap: 2,
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-end',
            marginRight: 12,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Register
          </Typography>
          {renderForm}
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'center' }}>
            Have an account?
            <Link
              sx={{
                textDecoration: 'underline',
                color: '#010202',
                fontWeight: 'bold',
                marginLeft: 1,
              }}
              href="/login"
            >
              Login
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RegisterView;
