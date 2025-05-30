import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        const response = await auth.login(values);
        login(response.token, response.user);
        navigate('/');
      } catch (err) {
        setError('Invalid email or password');
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#ffffff',
      }}
    >
      {/* Left Side - Blue Gradient */}
      <Box
        sx={{
          width: '50%',
          background: 'linear-gradient(135deg, #0062FF 0%, #0E4ECA 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}
      >
        <CalendarMonthIcon sx={{ fontSize: 64, mb: 3 }} />
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome to
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Job Tracker
        </Typography>
        <Typography 
          sx={{ 
            maxWidth: 400, 
            textAlign: 'center', 
            mt: 3,
            opacity: 0.9,
            fontSize: '0.938rem'
          }}
        >
          Keep track of your job applications and never miss an opportunity
        </Typography>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, sm: 6, md: 8, lg: 12 },
        }}
      >
        <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h4"
            sx={{
              color: '#111827',
              fontWeight: 600,
              fontSize: '1.75rem',
              mb: 1,
            }}
          >
            Sign in to your account
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#6B7280',
              fontSize: '0.938rem',
              mb: 4,
            }}
          >
            Enter your credentials to access your account
          </Typography>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                bgcolor: '#FEE2E2',
                color: '#B91C1C',
                p: 2,
                borderRadius: 1,
                mb: 3,
              }}
            >
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
                autoFocus
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0062FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0062FF',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6B7280',
                    '&.Mui-focused': {
                      color: '#0062FF',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0062FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0062FF',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6B7280',
                    '&.Mui-focused': {
                      color: '#0062FF',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: '#6B7280' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  bgcolor: '#0062FF',
                  fontSize: '0.938rem',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#0051D4',
                    boxShadow: 'none',
                  },
                }}
              >
                Sign in
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#0062FF',
                    textDecoration: 'none',
                    fontSize: '0.938rem',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Don't have an account? Sign up
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login; 