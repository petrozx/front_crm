import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store";
import App from "./App";

if (!window._babelPolyfill) {
    require('babel-polyfill')
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App/>
  </Provider>
);

reportWebVitals();
