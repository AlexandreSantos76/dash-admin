import React from 'react';

import { AuthProvider } from './auth';
import { PlansProvider } from './plans';
import {UsersProvider} from './users'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <UsersProvider>
      <PlansProvider>
        { children }
      </PlansProvider>
    </UsersProvider>
  </AuthProvider>
);

export default AppProvider;