import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { colors, shadows, shape, transitions } from '../../theme/constants';

interface CardProps extends PaperProps {
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, hoverEffect = true, sx, ...props }) => {
  return (
    <Paper
      sx={{
        border: `1px solid ${colors.border.main}`,
        borderRadius: shape.borderRadiusLarge,
        boxShadow: shadows.card,
        transition: transitions.standard,
        ...(hoverEffect && {
          '&:hover': {
            boxShadow: shadows.cardHover,
            borderColor: colors.border.dark,
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card; 