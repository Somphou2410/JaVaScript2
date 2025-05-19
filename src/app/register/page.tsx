'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // ui state
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
    submit?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    if (!confirm) {
      errs.confirm = 'Please confirm your password';
    } else if (confirm !== password) {
      errs.confirm = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const canSubmit =
    isEmailValid(email) &&
    isPasswordValid(password) &&
    confirm === password &&
    !loading;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
      p={2}
    >
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              fullWidth
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
              sx={{ mt: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              required
              sx={{ mt: 2 }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              error={!!errors.confirm}
              helperText={errors.confirm}
              required
              sx={{ mt: 2 }}
            />

            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.submit}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!canSubmit}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ mt: 3 }}
            >
              {loading ? 'Creating Account…' : 'Register'}
            </Button>
          </Box>

          {success && (
            <Typography
              color="success.main"
              align="center"
              sx={{ mt: 2 }}
            >
              Account created successfully!
            </Typography>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Link href="/login" underline="hover" variant="body2">
              Already have an account?
            </Link>
            <Link href="/forget-password" underline="hover" variant="body2">
              Forgot Password?
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
