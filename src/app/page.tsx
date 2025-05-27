import Layout from './components/layout';
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', // Adjust based on your header height
          width: '100%',
        }}
      >
        <Typography variant="h6">Hello, this is the homepage!</Typography>
      </Box>
    </Layout>
  );
}
