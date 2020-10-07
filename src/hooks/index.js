import React from 'react';

import { AuthProvider } from './auth';
import { PlansProvider } from './plans';
import { UsersProvider } from './users'
import { ChargebacksProvider } from './chargebacks';
import { GetnetProvider } from './getnet'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <UsersProvider>
      <PlansProvider>
        <ChargebacksProvider>
          <GetnetProvider>
           { children }
          </GetnetProvider>
        </ChargebacksProvider>
      </PlansProvider>
    </UsersProvider>
  </AuthProvider>
);

export default AppProvider;