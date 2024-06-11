import React from 'react';
import ReactDOM from 'react-dom/client';

import LibraryContainer from './library/LibraryContainer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LibraryContainer />
  </React.StrictMode>
);