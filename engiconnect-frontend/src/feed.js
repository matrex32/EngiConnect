import React from 'react';
import ReactDOM from 'react-dom/client';

import UserProfileContainer from './feed/FeedContainer.jsx';
import FeedContainer from './feed/FeedContainer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FeedContainer />
  </React.StrictMode>
);