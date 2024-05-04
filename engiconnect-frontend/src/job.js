import React from 'react';
import ReactDOM from 'react-dom/client';

import JobContainer from './job/JobContainer.jsx';
import FeedContainer from './feed/FeedContainer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JobContainer />
  </React.StrictMode>
);