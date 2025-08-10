import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import ToastProvider from './ToastProvider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Button color="inherit" component={Link} to="/create">Create</Button>
          <Button color="inherit" component={Link} to="/myforms">My Forms</Button>
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Container sx={{ py: 4 }}>
        {children}
         <ToastProvider />
      </Container>
    </Box>
  );
}
