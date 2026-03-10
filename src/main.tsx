import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './global.less';
import Page from './pages/index';

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root'),
);
