// import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ReactQueryProvider } from './queries';
import { store } from './redux/store';
import { ThemeProvider } from './themes/core/theme-provider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactQueryProvider>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ReactQueryProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
