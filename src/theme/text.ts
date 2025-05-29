import { SxProps } from '@mui/material';
import { colors, typography } from './constants';

export const textStyles = {
  pageTitle: {
    ...typography.h4,
    color: colors.text.primary,
    fontWeight: 600,
    mb: 1,
  } as SxProps,

  pageSubtitle: {
    ...typography.subtitle1,
    color: colors.text.secondary,
    mb: 4,
  } as SxProps,

  sectionTitle: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: 600,
    mb: 2,
  } as SxProps,

  sectionSubtitle: {
    ...typography.body2,
    color: colors.text.secondary,
    mb: 3,
  } as SxProps,

  tableHeader: {
    color: colors.text.secondary,
    fontWeight: 500,
  } as SxProps,

  tableCell: {
    color: colors.text.primary,
  } as SxProps,

  label: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: 500,
    mb: 1,
  } as SxProps,

  helperText: {
    ...typography.body2,
    color: colors.text.secondary,
  } as SxProps,

  error: {
    ...typography.body2,
    color: colors.error.main,
  } as SxProps,
} as const; 