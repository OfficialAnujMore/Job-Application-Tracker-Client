import React from 'react';
import { Box, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '1.2rem';
      case 'large':
        return '2rem';
      default:
        return '1.5rem';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <WorkIcon
        sx={{
          fontSize: getIconSize(),
          color: 'primary.main',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        }}
      />
      {showText && (
        <Typography
          variant="h6"
          sx={{
            fontSize: getFontSize(),
            fontWeight: 700,
            background: 'linear-gradient(45deg, #3f51b5, #f50057)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
          }}
        >
          JobTracker
        </Typography>
      )}
    </Box>
  );
};

export default Logo; 