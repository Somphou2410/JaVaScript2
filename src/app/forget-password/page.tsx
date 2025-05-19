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

export default function ForgotPasswordPage() {
  // form state
  const [email, setEmail] = useState('');

  // ui state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isEmailValid = (e: string) => /^\S+@\S+\.\S+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    } else if (!isEmailValid(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage(`Recovery link sent to ${email}`);
    }, 1500);
  };

  const canSubmit = isEmailValid(email) && !loading;

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
            Password Recovery
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              fullWidth
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              required
              sx={{ mt: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!canSubmit}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ mt: 3 }}
            >
              {loading ? 'Sending…' : 'Send Recovery Link'}
            </Button>
          </Box>

          {message && (
            <Typography
              color="success.main"
              align="center"
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Link href="/login" underline="hover" variant="body2">
              Back to Login
            </Link>
            <Link href="/register" underline="hover" variant="body2">
              Create Account
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
