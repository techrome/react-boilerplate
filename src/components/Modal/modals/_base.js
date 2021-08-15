import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    titleWrapper: {
      padding: theme.spacing(2),
      position: 'relative',
    },
    title: {
      paddingRight: theme.spacing(6),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    content: {
      padding: theme.spacing(2),
      overflowY: 'auto',
    },
    actions: {
      margin: 0,
      padding: theme.spacing(2),
    },
  }),
  { index: 1 },
);

const Modal = ({
  title,
  children,
  confirmText = 'Save',
  onConfirm,
  onClose,
  ...props
}) => {
  const cls = useStyles();

  return (
    <>
      <DialogTitle disableTypography className={cls.titleWrapper}>
        <Typography variant="h6" className={cls.title}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          className={cls.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={cls.content}>
        {children}
      </DialogContent>

      <DialogActions className={cls.actions}>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          size="large"
          type="submit"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </>
  );
};

export default Modal;
