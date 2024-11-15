import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { store } from './redux/store';
import LoadingPage from './pages/loading_page';
import SnackbarContainer from './components/snackbar/alert_auth';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <React.Suspense fallback={<LoadingPage />}>
            <SnackbarContainer />
            <App />
          </React.Suspense>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
