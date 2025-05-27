'use client';

import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  CssBaseline,
} from '@mui/material';

const drawerWidth = 200;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          height: '70px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'pink', 
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
            My Header
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '70px',
            height: 'calc(100% - 70px)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography>Navigation</Typography>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: '70px',
          ml: `${drawerWidth + 10}px`,
          mr: '20px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
