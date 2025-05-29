import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { colors, shape } from '../../theme/constants';

const TextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <MuiTextField
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: shape.borderRadius,
          '& fieldset': {
            borderColor: colors.border.main,
          },
          '&:hover fieldset': {
            borderColor: colors.border.dark,
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.primary.main,
          },
        },
        '& .MuiInputLabel-root': {
          color: colors.text.secondary,
          '&.Mui-focused': {
            color: colors.primary.main,
          },
        },
        '& .MuiInputBase-input': {
          color: colors.text.primary,
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default TextField; 