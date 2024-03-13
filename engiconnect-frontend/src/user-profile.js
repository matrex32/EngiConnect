import React from 'react';
import ReactDOM from 'react-dom/client';

import UserProfileContainer from './user profile/UserProfileContainer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProfileContainer />
  </React.StrictMode>
);