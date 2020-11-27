import React from 'react';

import { AuthProvider } from './auth';
import { PlansProvider } from './plans';
import { UsersProvider } from './users'
import { ChargebacksProvider } from './chargebacks';
import { GatewayProvider } from './getnet'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <UsersProvider>
      <PlansProvider>
        <ChargebacksProvider>
          <GatewayProvider>
           { children }
          </GatewayProvider>
        </ChargebacksProvider>
      </PlansProvider>
    </UsersProvider>
  </AuthProvider>
);

export default AppProvider;