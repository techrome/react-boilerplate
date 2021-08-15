import React from 'react';
import { Typography, CircularProgress, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    main: {
      position: 'relative',
    },
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      padding: theme.spacing(2),
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 2,
      transition: '0.3s',
      borderRadius: theme.spacing(1),
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    overlayContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(2),
      backgroundColor: '#fff',
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[4],
    },
    text: {
      marginTop: theme.spacing(2),
    },
    content: {
      filter: (props) => (props.isLoading ? 'blur(2px)' : 'none'),
      transition: '0.3s',
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    },
  }),
  { index: 1 },
);

const SpinnerOverlay = ({ visible, text, children, ...props }) => {
  const cls = useStyles({ isLoading: visible });

  return (
    <div className={cls.main}>
      <Fade in={visible} timeout={300}>
        <div className={cls.overlay}>
          <div className={cls.overlayContent}>
            <CircularProgress size={50} />
            {!!text && (
              <Typography variant="h5" className={cls.text}>
                {text}
              </Typography>
            )}
          </div>
        </div>
      </Fade>
      <div className={cls.content}>{children}</div>
    </div>
  );
};

export default SpinnerOverlay;
