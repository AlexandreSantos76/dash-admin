import React, { useContext, createContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom'


import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {

  const history = useHistory();

  const [data, setData] = useState(() => {

    const token = localStorage.getItem('@MonetizDB:token');
    const user = JSON.parse(localStorage.getItem('@MonetizDB:user'));
    

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: user };
    }

  });

 

  const signIn = useCallback(async (data) => {
    api.post('/session/login', data)
      .then(async(response) => {
        const { token, user } = response.data;
        console.log(user);
        localStorage.setItem('@MonetizDB:token', token);
        localStorage.setItem('@MonetizDB:user', await JSON.stringify(user));
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token, user });
        history.push('/');

      }).catch((err) => {
        console.log(err.data)
      });
  }, [history])

  const signOut = useCallback(async () => {
    localStorage.removeItem('@MonetizDB:token');
    localStorage.removeItem('@MonetizDB:user');
    setData({ token: null, user: null })
    history.push('/auth/login');
  }, [history])


  return (
    <AuthContext.Provider value={{ user: data?.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };