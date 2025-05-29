import React from 'react';
import { Box } from '@mui/material';

const GeometricBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '50%',
        background: 'linear-gradient(135deg, #4A3AFF 0%, #6B4EFF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Main Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #6B4EFF 0%, #8D7FFF 100%)',
          borderRadius: '50%',
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '150px',
          height: '150px',
          background: '#4A3AFF',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity: 0.4,
        }}
      />

      {/* Abstract Patterns */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '300px',
          height: '200px',
          background: 'linear-gradient(180deg, transparent 0%, #6B4EFF 100%)',
          opacity: 0.2,
          transform: 'rotate(-15deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '25%',
          width: '40px',
          height: '4px',
          background: '#8D7FFF',
          boxShadow: '0 12px 0 #8D7FFF, 0 24px 0 #8D7FFF',
          opacity: 0.5,
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '40%',
          width: '8px',
          height: '8px',
          background: '#FFD700',
          borderRadius: '50%',
          boxShadow: '0 0 15px #FFD700',
          opacity: 0.8,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '35%',
          width: '120px',
          height: '120px',
          background: '#6B4EFF',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          opacity: 0.3,
          transform: 'rotate(45deg)',
        }}
      />

      {/* Small Geometric Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '60px',
          height: '60px',
          background: '#8D7FFF',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '25%',
          width: '100px',
          height: '2px',
          background: '#8D7FFF',
          boxShadow: '15px 15px 0 #8D7FFF, -15px 15px 0 #8D7FFF',
          opacity: 0.3,
          transform: 'rotate(45deg)',
        }}
      />

      {/* Wave Pattern */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(0deg, #4A3AFF 0%, transparent 100%)',
          opacity: 0.2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at 50% 0%, #6B4EFF 0%, transparent 70%)',
            opacity: 0.4,
          }
        }}
      />
    </Box>
  );
};

export default GeometricBackground; 