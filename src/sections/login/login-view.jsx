import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Link from 'src/components/link';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { login, googleLogin } from '../../redux/actions/authActions';

// ----------------------------------------------------------------------

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = { email, password };
    dispatch(login(credentials, navigate));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const clientId = '73919715033-8vil57eo7p9sd56ljlfl9o4gbdpvoebo.apps.googleusercontent.com';

  const handleGoogleLoginSuccess = (response) => {
    dispatch(googleLogin(response.credential, navigate));
  };

  const handleGoogleLoginFailure = (response) => {
    console.log('Google login failed', response);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          value={email}
          variant="outlined"
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
          variant="outlined"
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
        onClick={handleLogin}
      >
        Login
      </Button>
      <Divider>or</Divider>
      <Stack justifyContent="center" alignItems="center">
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            clientId={clientId}
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
          />
        </GoogleOAuthProvider>
      </Stack>
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
            p: 5,
            width: 1,
            maxWidth: 420,
            gap: 2.5,
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-end',
            marginRight: 18,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          {renderForm}
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?
            <Link
              sx={{
                textDecoration: 'underline',
                color: '#010202',
                fontWeight: 'bold',
                marginLeft: 1,
              }}
              href="/register"
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginView;
