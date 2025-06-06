'use client';

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Omit<User, 'id'>>({
    fullName: '',
    email: '',
    role: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.role) {
      alert('Please fill in all fields.');
      return;
    }

    if (editId !== null) {
      setUsers(prev =>
        prev.map(u => (u.id === editId ? { ...u, ...form } : u))
      );
      setEditId(null);
    } else {
      const newUser: User = {
        id: Date.now(),
        ...form,
      };
      setUsers(prev => [...prev, newUser]);
    }

    setForm({ fullName: '', email: '', role: '' });
  };

  const handleEdit = (user: User) => {
    setEditId(user.id);
    setForm({ fullName: user.fullName, email: user.email, role: user.role });
  };

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ fullName: '', email: '', role: '' });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {/* User Form */}
      <Box component={Paper} sx={{ p: 2, mb: 4, maxWidth: 600 }}>
        <TextField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          {editId !== null ? 'Update User' : 'Add User'}
        </Button>
      </Box>

      {/* User Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(user)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(user.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
