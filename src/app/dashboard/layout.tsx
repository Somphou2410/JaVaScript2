'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  CssBaseline,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 200;

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }} role="presentation" onClick={() => setMobileOpen(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/dashboard"
            selected={pathname === '/dashboard'}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/products"
            selected={pathname === '/products'}
          >
            <ListItemIcon><Inventory2Icon /></ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/products/manage"
            selected={pathname === '/products/manage'}
          >
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Product Management" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/users/manage"
            selected={pathname === '/users/manage'}
          >
            <ListItemIcon><PeopleAltIcon /></ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          height: '70px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'pink',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ color: 'white' }}>
              My DashBoard
            </Typography>
          </Box>

          <Button variant="outlined" color="inherit" onClick={handleBackToLogin}>
            Return Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            top: '70px',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '70px',
          height: 'calc(100vh - 70px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
