'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';


const dummyProducts = [
  {
    id: 1,
    name: 'Beer Lao',
    description: 'Kin laiy mao',
    price: 250000,
  },
  {
    id: 2,
    name: 'Soju',
    description: 'R yoiyyy',
    price: 40000,
  },
  {
    id: 3,
    name: 'Summerby',
    description: 'Zaep',
    price:30000 ,
  },
];

export default function AllProductsPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        All Product
      </Typography>

      {dummyProducts.length === 0 ? (
        <Typography color="text.secondary">Don't have show a product</Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name Product</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price (kip)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}

