import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Tooltip,
  alpha,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  FilterAlt as FilterIcon,
  RestartAlt as ResetIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { applications } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Application, 
  ApplicationStats, 
  ApplicationStatus,
  applicationStatuses,
} from '../types/application';
import Logo from '../components/Logo';
import ApplicationTable from '../components/ApplicationTable';
import ApplicationFilters from '../components/ApplicationFilters';
import { colors, shadows, shape, transitions } from '../theme/constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const statusColors: Record<ApplicationStatus, string> = {
  'Applied': '#4CAF50',
  'In Progress': '#FF9800',
  'Interview': '#2196F3',
  'Rejected': '#F44336',
  'Accepted': '#8BC34A'
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [stats, setStats] = useState<ApplicationStats[]>([]);
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | ''>('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await applications.getAll();
      setApplicationList(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        if (err.message.includes('Session expired')) {
          handleLogout();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setError(null);
      const data = await applications.getStats();
      setStats(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await applications.delete(id);
      fetchApplications();
      fetchStats();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleFilterClick = (status: ApplicationStatus) => {
    setActiveFilter(status === activeFilter ? null : status);
  };

  const resetFilter = () => {
    setActiveFilter(null);
  };

  const getStatusCount = (status: ApplicationStatus) => {
    const stat = stats.find(s => s._id === status);
    return stat ? stat.count : 0;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Implement search logic
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status as ApplicationStatus | '');
    // Implement status filter logic
  };

  const handlePriorityFilter = (priority: string) => {
    setPriorityFilter(priority);
    // Implement priority filter logic
  };

  const handleCloseError = () => {
    setError(null);
  };

  const filteredApplications = applicationList.filter((app) => {
    const matchesSearch = searchQuery
      ? app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus = statusFilter ? app.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box
      sx={{
        py: 4,
        bgcolor: colors.background.light,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Logo size="small" showText={false} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600, 
                  color: colors.text.primary 
                }}
              >
                Welcome back, {user?.fullName}
              </Typography>
            </Box>
            <Typography 
              variant="subtitle1" 
              sx={{ color: colors.text.secondary }}
            >
              Track and manage your job applications
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/application')}
            >
              New Application
            </Button>
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: colors.error.main,
                  border: `1px solid ${colors.border.main}`,
                  borderRadius: shape.borderRadius,
                  transition: transitions.standard,
                  '&:hover': {
                    bgcolor: alpha(colors.error.main, 0.1),
                    borderColor: colors.border.dark,
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            
          </Box>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {applicationStatuses.map((status) => (
            <Grid item xs={12} sm={6} md={2.4} key={status}>
              <Card
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  bgcolor: activeFilter === status 
                    ? alpha(statusColors[status], 0.1)
                    : colors.background.paper,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    backgroundColor: statusColors[status],
                  }
                }}
                onClick={() => handleFilterClick(status)}
              >
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    fontWeight: 600,
                    color: statusColors[status],
                    mb: 1
                  }}
                >
                  {getStatusCount(status)}
                </Typography>
                <Typography 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: colors.text.secondary,
                    fontWeight: 500
                  }}
                >
                  <FilterIcon sx={{ fontSize: 16 }} />
                  {status}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <ApplicationFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearch={setSearchQuery}
          onStatusFilter={setStatusFilter}
        />

        {/* Table with Reset Filter Button */}
        <Box sx={{ position: 'relative' }}>
          {(activeFilter || searchQuery || statusFilter) && (
            <Button
              variant="outlined"
              startIcon={<ResetIcon />}
              onClick={() => {
                resetFilter();
                setSearchQuery('');
                setStatusFilter('');
              }}
              sx={{
                position: 'absolute',
                right: 0,
                top: -48,
              }}
            >
              Reset Filters
            </Button>
          )}
          <ApplicationTable 
            applications={filteredApplications}
            onDelete={handleDelete}
          />
        </Box>

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard; 