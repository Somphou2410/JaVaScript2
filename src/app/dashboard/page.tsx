'use client';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Avatar,
  Container,
  Stack
} from '@mui/material';
import { 
  BarChart, 
  TrendingUp, 
  Person, 
  Notifications, 
  Dashboard as DashboardIcon, 
  Settings 
} from '@mui/icons-material';

export default function Dashboard() {
  // Sample data for dashboard widgets
  const stats = [
    { title: 'Total Users', value: '1,245', icon: <Person />, color: '#3f51b5' },
    { title: 'Weekly Sales', value: '$8,527', icon: <TrendingUp />, color: '#4caf50' },
    { title: 'Pending Tasks', value: '18', icon: <Notifications />, color: '#ff9800' },
    { title: 'Server Load', value: '68%', icon: <BarChart />, color: '#f44336' },
  ];

  const recentActivities = [
    { id: 1, activity: 'New user registered', time: '5 min ago' },
    { id: 2, activity: 'Sales report generated', time: '2 hours ago' },
    { id: 3, activity: 'Server maintenance completed', time: '1 day ago' },
  ];

  return (
    <Box sx={{ py: 4, px: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DashboardIcon sx={{ fontSize: 32, color: '#3f51b5', mr: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#3f51b5', cursor: 'pointer' }}>JD</Avatar>
          <Settings sx={{ color: '#757575', cursor: 'pointer' }} />
        </Box>
      </Box>

      {/* Stats Cards using Flexbox instead of Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3, 
        mb: 4 
      }}>
        {stats.map((stat, index) => (
          <Box 
            key={index} 
            sx={{ 
              flexGrow: 1, 
              flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' } 
            }}
          >
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                  {stat.icon}
                </Avatar>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Main Content using Flexbox instead of Grid */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3 
      }}>
        {/* Recent Activities */}
        <Box sx={{ 
          flexGrow: 1,
          flexBasis: { xs: '100%', md: 'calc(50% - 12px)' }
        }}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Recent Activities
            </Typography>
            {recentActivities.map((item) => (
              <Box 
                key={item.id} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  p: 2,
                  borderBottom: '1px solid #eee',
                  '&:last-child': { borderBottom: 'none' }
                }}
              >
                <Typography variant="body1">{item.activity}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.time}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Overview Card */}
        <Box sx={{ 
          flexGrow: 1,
          flexBasis: { xs: '100%', md: 'calc(50% - 12px)' }
        }}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Overview
            </Typography>
            <Card sx={{ bgcolor: '#f9f9f9', mb: 2 }}>
              <CardContent>
                <Typography variant="body2" paragraph>
                  Welcome to your dashboard! Track your key metrics, recent activities,
                  and system status all in one place.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last updated:
                  </Typography>
                  <Typography variant="subtitle2" color="primary.main">
                    Today at 12:45 PM
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: '#e8f5e9', 
              borderRadius: 1, 
              border: '1px solid #c8e6c9' 
            }}>
              <Typography variant="body2" color="success.main">
                All systems operational
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}