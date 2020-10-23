import React, { useContext, createContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom'


import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {

  const history = useHistory();

  const [data, setData] = useState(() => {

    const token = localStorage.getItem('@MonetizDB:token');
    const user = localStorage.getItem('@MonetizDB:user');

    if( token && user ){
      api.defaults.headers.authorization = `Barear ${token}`;

      return { token, user: JSON.parse(user) };
    }

  });

  
  
  const signIn = useCallback(async({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@MonetizDB:token',token);
    localStorage.setItem('@MonetizDB:user', user);

    api.defaults.headers.authorization = `Barear ${token}`;

    setData({ token, user });

    history.push('/');
  },[history])


  return (
    <AuthContext.Provider value={{ user: data?.user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth() {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };