import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './router';
import store from 'src/redux';
import theme from 'src/config/theme';
import { ErrorBoundaryFallback } from 'src/components/ErrorBoundaryFallback';
import { GlobalModal } from 'src/components/Modal';
import { Notifier } from 'src/components/Notifier';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom',
            }}
            maxSnack={4}
          >
            <GlobalModal />
            <Notifier />
            <App />
          </SnackbarProvider>
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
