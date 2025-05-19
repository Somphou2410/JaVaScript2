'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined, 
  Email as EmailIcon,
  LoginOutlined,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; auth?: string }>({});

  // validators
  const isEmailValid = (e: string) => /^\S+@\S+\.\S+$/.test(e);
  const isPasswordValid = (p: string) => p.length >= 8;

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) {
      errs.email = 'Email is required';
    } else if (!isEmailValid(email)) {
      errs.email = 'Invalid email format';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (!isPasswordValid(password)) {
      errs.password = 'Password must be at least 8 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ auth: data.message || 'Incorrect credentials' });
      } else {
        router.push('/dashboard');
      }
    } catch {
      setErrors({ auth: 'Network error, please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = isEmailValid(email) && isPasswordValid(password) && !loading;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6B73FF 0%,rgb(255, 0, 217) 100%)',
        padding: { xs: 2, sm: 4 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            backgroundColor: '#f9fafc',
            borderBottom: '1px solid #eaedf3',
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              mb: 2,
              bgcolor: '#4A58D3',
              width: 56,
              height: 56,
              boxShadow: '0px 4px 14px rgba(74, 88, 211, 0.3)',
            }}
          >
            <LockOutlined fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="#2D3748">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Log in to your account to continue
          </Typography>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ px: { xs: 3, sm: 4 }, py: 4, bgcolor: '#fff' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': {
                    borderColor: '#4A58D3',
                  },
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4A58D3 !important',
                },
              }}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': {
                    borderColor: '#4A58D3',
                  },
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4A58D3 !important',
                },
              }}
            />

            {/* Forgot Password Link */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Link
                href="/forget-password"
                underline="none"
                variant="body2"
                color="#4A58D3"
                sx={{ 
                  fontWeight: 500,
                  '&:hover': { color: '#6B73FF' }
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Auth Error Message */}
            {errors.auth && (
              <Box 
                sx={{ 
                  backgroundColor: '#FEF2F2',
                  borderRadius: 1,
                  p: 1.5,
                  mb: 2,
                  border: '1px solid #FEE2E2',
                }}
              >
                <Typography color="#B91C1C" variant="body2">
                  {errors.auth}
                </Typography>
              </Box>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!canSubmit}
              sx={{
                mt: 1,
                mb: 3,
                py: 1.5,
                bgcolor: '#4A58D3',
                boxShadow: '0px 4px 14px rgba(74, 88, 211, 0.3)',
                '&:hover': {
                  bgcolor: '#3A46B6',
                },
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
              }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginOutlined />}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>

            {/* Divider */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                my: 2
              }}
            >
              <Divider sx={{ flexGrow: 1 }} />
              <Typography color="text.secondary" variant="body2" sx={{ px: 2 }}>
                OR CONTINUE WITH
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            {/* Social Login Buttons */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2,
                mt: 2
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ 
                  py: 1,
                  color: '#5F6368',
                  borderColor: '#DADCE0',
                  '&:hover': {
                    bgcolor: '#F8F9FA',
                    borderColor: '#D2E3FC',
                  },
                  textTransform: 'none',
                  borderRadius: 1.5,
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
                sx={{ 
                  py: 1,
                  color: '#1877F2',
                  borderColor: '#E7F3FF',
                  '&:hover': {
                    bgcolor: '#F0F7FF',
                    borderColor: '#C2DBFF',
                  },
                  textTransform: 'none',
                  borderRadius: 1.5,
                }}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AppleIcon />}
                sx={{ 
                  py: 1,
                  color: '#000000',
                  borderColor: '#E6E6E6',
                  '&:hover': {
                    bgcolor: '#F5F5F5',
                    borderColor: '#D1D1D1',
                  },
                  textTransform: 'none',
                  borderRadius: 1.5,
                }}
              >
                Apple
              </Button>
            </Box>
          </Box>
        </CardContent>

        {/* Footer */}
        <Box
          sx={{
            textAlign: 'center',
            py: 2.5,
            bgcolor: '#f9fafc',
            borderTop: '1px solid #eaedf3',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              href="/register"
              underline="none"
              sx={{ 
                fontWeight: 600, 
                color: '#4A58D3',
                '&:hover': { color: '#6B73FF' }
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}