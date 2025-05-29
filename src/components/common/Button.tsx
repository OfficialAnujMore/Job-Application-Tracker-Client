import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { colors, shadows, shape, transitions } from '../../theme/constants';

interface ButtonProps extends MuiButtonProps {
  noBorder?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, noBorder, sx, ...props }) => {
  const getVariantStyles = (variant: string = 'contained') => {
    switch (variant) {
      case 'contained':
        return {
          bgcolor: colors.primary.main,
          color: '#ffffff',
          boxShadow: shadows.button,
          '&:hover': {
            bgcolor: colors.primary.dark,
            boxShadow: shadows.buttonHover,
          },
        };
      case 'outlined':
        return {
          borderColor: noBorder ? 'transparent' : colors.border.main,
          color: colors.text.primary,
          '&:hover': {
            borderColor: noBorder ? 'transparent' : colors.border.dark,
            bgcolor: colors.grey[50],
          },
        };
      default:
        return {};
    }
  };

  return (
    <MuiButton
      sx={{
        borderRadius: shape.borderRadius,
        textTransform: 'none',
        transition: transitions.standard,
        fontWeight: 500,
        ...getVariantStyles(props.variant),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button; 