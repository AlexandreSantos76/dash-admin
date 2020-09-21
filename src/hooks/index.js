import React from 'react';

import { AuthProvider } from './auth';
import { PlansProvider } from './plans';
import {UsersProvider} from './users'
import { ChargebacksProvider } from './chargebacks';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <UsersProvider>
      <PlansProvider>
        <ChargebacksProvider>
          { children }
        </ChargebacksProvider>
      </PlansProvider>
    </UsersProvider>
  </AuthProvider>
);

export default AppProvider;