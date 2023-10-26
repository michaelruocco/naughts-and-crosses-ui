import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/app.css';

import NaughtsAndCrossesApp from 'components/NaughtsAndCrossesApp';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <NaughtsAndCrossesApp />
  </React.StrictMode>,
);
