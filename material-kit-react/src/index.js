import React from 'react';
// scroll bar
import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import style from 'src/css/styles.css';
import App from 'src/App';
import { Provider } from 'react-redux';
import store from 'src/redux-toolkit/store';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App style={style} />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  // </React.StrictMode>,
);

// If you want to enable client cache, register instead.
// serviceWorker.unregister();
