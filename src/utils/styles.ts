import { SxProps } from '@mui/material';
import { colors, shadows, shape } from '../theme/constants';

export const layoutStyles = {
  page: {
    py: 4,
    minHeight: '100vh',
    bgcolor: colors.background.light,
  } as SxProps,

  container: {
    maxWidth: 'xl',
    px: { xs: 2, sm: 3 },
  } as SxProps,

  section: {
    mb: 4,
  } as SxProps,

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps,

  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as SxProps,

  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  } as SxProps,

  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  } as SxProps,
} as const;

export const componentStyles = {
  card: {
    border: `1px solid ${colors.border.main}`,
    borderRadius: shape.borderRadiusLarge,
    boxShadow: shadows.card,
    bgcolor: colors.background.paper,
  } as SxProps,

  table: {
    '& .MuiTableCell-head': {
      bgcolor: colors.grey[50],
      borderBottom: `2px solid ${colors.border.main}`,
    },
    '& .MuiTableCell-body': {
      borderBottom: `1px solid ${colors.border.light}`,
    },
    '& .MuiTableRow-root:hover': {
      bgcolor: colors.grey[50],
    },
  } as SxProps,

  form: {
    '& .MuiFormControl-root': {
      mb: 2,
    },
  } as SxProps,

  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: shape.borderRadiusLarge,
      boxShadow: shadows.card,
    },
  } as SxProps,
} as const;

export const getHoverStyles = (color: string) => ({
  '&:hover': {
    bgcolor: color,
    opacity: 0.1,
  },
});

export const getGradient = (startColor: string, endColor: string) => 
  `linear-gradient(to right, ${startColor}, ${endColor})`;

export const getBoxShadow = (color: string) => 
  `0 4px 14px 0 ${color}40`;

export const getResponsiveSpacing = (base: number) => ({
  xs: base * 0.5,
  sm: base * 0.75,
  md: base,
  lg: base * 1.25,
  xl: base * 1.5,
}); 