import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Stack,
  TablePagination,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Application } from '../types/application';
import { colors, shadows, shape } from '../theme/constants';
import Card from './common/Card';
import Button from './common/Button';
import Chip from './common/Chip';

interface ApplicationTableProps {
  applications: Application[];
  onDelete: (id: string) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ applications, onDelete }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Reset to first page when data changes
  useEffect(() => {
    setPage(0);
  }, [applications]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'info';
      case 'In Progress':
        return 'warning';
      case 'Interview':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Accepted':
        return 'success';
      default:
        return 'default';
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applications.length) : 0;

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${colors.border.main}`,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" fontWeight={600} color={colors.text.primary}>
              All Applications
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.text.secondary }}
            >
              {applications.length} total
            </Typography>
          </Stack>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: colors.text.secondary, fontWeight: 500 }}>Company</TableCell>
                <TableCell sx={{ color: colors.text.secondary, fontWeight: 500 }}>Position</TableCell>
                <TableCell sx={{ color: colors.text.secondary, fontWeight: 500 }}>Location</TableCell>
                <TableCell sx={{ color: colors.text.secondary, fontWeight: 500 }}>Date Applied</TableCell>
                <TableCell sx={{ color: colors.text.secondary, fontWeight: 500 }}>Status</TableCell>
                <TableCell align="right" sx={{ color: colors.text.secondary, fontWeight: 500 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((application) => (
                  <TableRow
                    key={application._id}
                    sx={{
                      '&:hover': {
                        bgcolor: colors.grey[50],
                      },
                    }}
                  >
                    <TableCell>{application.companyName}</TableCell>
                    <TableCell>{application.jobTitle}</TableCell>
                    <TableCell>{application.location}</TableCell>
                    <TableCell>
                      {new Date(application.dateApplied).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        colorVariant={getStatusVariant(application.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/application/${application._id}`)}
                            sx={{
                              color: colors.text.secondary,
                              '&:hover': {
                                color: colors.primary.main,
                                bgcolor: colors.primary.lighter,
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(application._id)}
                            sx={{
                              color: colors.text.secondary,
                              '&:hover': {
                                color: colors.error.main,
                                bgcolor: colors.error.light,
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color={colors.text.secondary}>
                      No applications found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={applications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${colors.border.main}`,
            '& .MuiTablePagination-select': {
              borderRadius: shape.borderRadius,
              borderColor: colors.border.main,
              '&:hover': {
                borderColor: colors.border.dark,
              },
            },
          }}
        />
      </Box>
    </Card>
  );
};

export default ApplicationTable; 