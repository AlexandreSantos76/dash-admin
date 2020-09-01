import React from 'react';

import { AuthProvider } from './auth';
import { PlansProvider } from './plans';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <PlansProvider>
      { children }
    </PlansProvider>
  </AuthProvider>
);

export default AppProvider;