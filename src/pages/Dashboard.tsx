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
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { applications } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Application, 
  ApplicationStats, 
  ApplicationStatus,
  dropdownStatuses,
  applicationStatuses
} from '../types/application';
import Logo from '../components/Logo';
import ApplicationTable from '../components/ApplicationTable';
import ApplicationFilters from '../components/ApplicationFilters';
import { colors, shadows, shape, transitions } from '../theme/constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ConfirmationModal from '../components/common/ConfirmationModal';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | ''>(dropdownStatuses[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);

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

  const handleDeleteClick = (id: string) => {
    setApplicationToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (applicationToDelete) {
      try {
        setError(null);
        await applications.delete(applicationToDelete);
        fetchApplications();
        fetchStats();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setDeleteModalOpen(false);
        setApplicationToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setApplicationToDelete(null);
  };

  const handleStatusFilter = (status: ApplicationStatus | '') => {
    setStatusFilter(status);
    if (status === '') {
      setSearchQuery('');
    }
  };

  const getStatusCount = (status: ApplicationStatus) => {
    if (status === 'Applied') {
      return applicationList.length;
    }
    return applicationList.filter(app => app.status === status).length;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
                  bgcolor: alpha(colors.error.main, 0.1),
                  color: colors.error.main,
                  '&:hover': {
                    bgcolor: alpha(colors.error.main, 0.2),
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
                  cursor: status !== 'Applied' ? 'pointer' : 'default',
                  bgcolor: statusFilter === status 
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
                onClick={() => status !== 'Applied' && handleStatusFilter(status)}
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
                  <FilterIcon sx={{ fontSize: 16, visibility: status === 'Applied' ? 'hidden' : 'visible' }} />
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
          onStatusFilter={handleStatusFilter}
        />

        {/* Table */}
        <ApplicationTable 
          applications={filteredApplications}
          onDelete={handleDeleteClick}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          open={deleteModalOpen}
          title="Delete Application"
          message="Are you sure you want to delete this application? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setError(null)}
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