import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';
import { colors, shape } from '../../theme/constants';

interface CustomChipProps extends Omit<ChipProps, 'color'> {
  colorVariant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

const getChipColors = (colorVariant: CustomChipProps['colorVariant'] = 'default') => {
  switch (colorVariant) {
    case 'success':
      return {
        color: colors.success.main,
        bgcolor: colors.success.light,
      };
    case 'warning':
      return {
        color: colors.warning.main,
        bgcolor: colors.warning.light,
      };
    case 'error':
      return {
        color: colors.error.main,
        bgcolor: colors.error.light,
      };
    case 'info':
      return {
        color: colors.primary.main,
        bgcolor: colors.primary.lighter,
      };
    default:
      return {
        color: colors.text.secondary,
        bgcolor: colors.grey[100],
      };
  }
};

const Chip: React.FC<CustomChipProps> = ({ colorVariant, sx, ...props }) => {
  const variantColors = getChipColors(colorVariant);

  return (
    <MuiChip
      sx={{
        borderRadius: shape.borderRadius,
        fontWeight: 500,
        ...variantColors,
        ...sx,
      }}
      {...props}
    />
  );
};

export default Chip; 