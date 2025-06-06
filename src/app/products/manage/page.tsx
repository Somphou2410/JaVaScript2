'use client';

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableHead,
  TableBody, TableRow, TableCell, IconButton, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || form.price <= 0 || form.quantity < 0) {
      alert('Please enter valid product details.');
      return;
    }

    if (editId !== null) {
      // Edit mode
      setProducts(prev =>
        prev.map(p => (p.id === editId ? { ...p, ...form } : p))
      );
      setEditId(null);
    } else {
      // Add mode
      const newProduct: Product = {
        ...form,
        id: Date.now(),
        price: Number(form.price),
        quantity: Number(form.quantity),
      };
      setProducts(prev => [...prev, newProduct]);
    }

    setForm({ name: '', description: '', price: 0, quantity: 0 });
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setForm({ ...product });
  };

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: '', description: '', price: 0, quantity: 0 });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      {/* Form */}
      <Box component={Paper} sx={{ p: 2, mb: 4, maxWidth: 600 }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
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
          {editId !== null ? 'Update Product' : 'Add Product'}
        </Button>
      </Box>

      {/* Product Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(product)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(product.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
