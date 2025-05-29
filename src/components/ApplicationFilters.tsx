import React from 'react';
import {
  Box,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { colors, shape } from '../theme/constants';
import { ApplicationStatus, dropdownStatuses } from '../types/application';
import Card from './common/Card';
import TextField from './common/TextField';

interface ApplicationFiltersProps {
  searchQuery: string;
  statusFilter: ApplicationStatus | '';
  onSearch: (value: string) => void;
  onStatusFilter: (status: ApplicationStatus | '') => void;
}

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  searchQuery,
  statusFilter,
  onSearch,
  onStatusFilter,
}) => {
  return (
    <Card
      hoverEffect={false}
      sx={{
        p: 2,
        mb: 3,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        placeholder="Search applications..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ minWidth: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: colors.text.secondary }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        label="Filter by Status"
        value={statusFilter}
        onChange={(e) => onStatusFilter(e.target.value as ApplicationStatus | '')}
        sx={{ 
          minWidth: 200,
          '& .MuiSelect-select': {
            color: `${colors.text.primary} !important`,
          },
          '& .MuiMenuItem-root': {
            color: colors.text.primary,
          }
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  color: colors.text.primary,
                  '&.Mui-selected': {
                    backgroundColor: colors.primary.lighter,
                    '&:hover': {
                      backgroundColor: colors.primary.lighter,
                    }
                  },
                  '&:hover': {
                    backgroundColor: colors.grey[50],
                  }
                }
              }
            }
          }
        }}
      >
        <MenuItem value="" sx={{ color: colors.text.primary }}>
          All Applications
        </MenuItem>
        {dropdownStatuses.map((status) => (
          <MenuItem 
            key={status} 
            value={status}
            sx={{ color: colors.text.primary }}
          >
            {status}
          </MenuItem>
        ))}
      </TextField>
    </Card>
  );
};

export default ApplicationFilters; 