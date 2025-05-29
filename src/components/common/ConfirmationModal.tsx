import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { colors } from '../../theme/constants';
import Button from './Button';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon sx={{ color: colors.warning.main }} />
          <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography color={colors.text.secondary}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color="error"
          sx={{ minWidth: 100 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal; 