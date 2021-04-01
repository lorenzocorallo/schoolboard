import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import App from './App';
import store from './redux/store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
