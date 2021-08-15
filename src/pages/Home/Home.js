import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    main: {
      marginTop: theme.spacing(4),
    },
  }),
  { index: 1 },
);

const Home = () => {
  const cls = useStyles();

  return (
    <Container maxWidth="sm" className={cls.main}>
      <Typography variant="h3" align="center">
        React boilerplate
      </Typography>
    </Container>
  );
};

export default Home;
