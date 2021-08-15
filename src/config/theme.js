import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

theme.overrides.MuiDialog = {
  paper: {
    minWidth: '80%',
  },
};

export default theme;
