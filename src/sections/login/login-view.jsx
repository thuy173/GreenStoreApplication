import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
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

const fall = keyframes`
  0% {
    transform: translate(-50px, -100px) rotate(0deg);
    opacity: 0;
  }
  20% {
    transform: translate(20px, 20vh) rotate(45deg);
    opacity: 0.7;
  }
  40% {
    transform: translate(-20px, 40vh) rotate(90deg);
    opacity: 0.8;
  }
  60% {
    transform: translate(30px, 60vh) rotate(135deg);
    opacity: 0.8;
  }
  80% {
    transform: translate(-10px, 80vh) rotate(160deg);
    opacity: 0.9;
  }
  100% {
    transform: translate(0px, 90vh) rotate(180deg);
    opacity: 1;
  }
`;

const BubbleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const Bubble = styled.div`
  position: absolute;
  width: 86px;
  height: 86px;
  animation: ${fall} 15s ease-in-out infinite;
  &.bubble1 {
    animation-duration: 23s;
    left: 10%;
    top: 0;
  }
  &.bubble2 {
    animation-duration: 24s;
    left: 30%;
    top: 0;
  }
  &.bubble3 {
    animation-duration: 22s;
    left: 70%;
    top: 0;
  }
  &.bubble4 {
    animation-duration: 23s;
    left: 50%;
    top: 0;
  }
  &.bubble5 {
    animation-duration: 21s;
    left: 20%;
    top: 0;
  }
`;

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
          'url(https://res.cloudinary.com/dmmk9racr/image/upload/v1719980006/bg-icon_hb355p.png)',
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

      <BubbleContainer>
        <Bubble className="bubble1">
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719990874/12d4d6e36b7e09185276ef02c3809622_m3c6fa.png"
            alt="Bubble"
          />
        </Bubble>
        <Bubble className="bubble2">
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719990953/2f06686986d40658d16a477414c5f17d_vspxqe.png"
            alt="Bubble"
          />
        </Bubble>
        <Bubble className="bubble3">
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719990962/55b1d314fe954b6b35159c0fe4022975_gnqobv.png"
            alt="Bubble"
          />
        </Bubble>
        <Bubble className="bubble4">
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719990977/ab76ab557b316334ffde8b3e07bfbd9d_ck9y17.png"
            alt="Bubble"
          />
        </Bubble>
        <Bubble className="bubble5">
          <img
            src="https://res.cloudinary.com/dmmk9racr/image/upload/v1719991055/e77cbc0a0652c2b5ddfda46f23e28ad9_juyomu.png"
            alt="Bubble"
          />
        </Bubble>
      </BubbleContainer>

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
