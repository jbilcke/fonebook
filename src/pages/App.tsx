import React from 'react';
import { getSession } from '../services/session';

import { HomePage } from './Home';
import { LoginPage } from './Login';

export const App = () => {
  // a bit crude, could benefit from being updated un real-time with a hook state manager
  return getSession().user.username ? <HomePage /> :  <LoginPage />;
};
