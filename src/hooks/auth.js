import moment from 'moment';
import React, { useContext, createContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'


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

  const isAuth = useCallback(() => {    
    if(data?.user && data?.token){
      let dateNow =  new Date()
      
        return (jwtDecode(data.token).exp < (dateNow.getTime() - jwtDecode(data.token).iat))       
    }
    return false
  },
    [data],
  )



  const signIn = useCallback(async (data) => {

    let date = moment()
    api.post('/session/login', data)
      .then(async (response) => {
        const { token, user } = response.data;
        localStorage.setItem('@MonetizDB:token', token);
        localStorage.setItem('@MonetizDB:user', await JSON.stringify(user));
        localStorage.setItem('@MonetizDB:expire', date)
        api.defaults.headers.authorization = `Bearer ${token}`;
       api.defaults.headers.contentType ="application/json";
       api.defaults.headers.accept="application/json;"
        setData({ token, user });
        history.push('/');
      }).catch((err) => {
        let data = err.response.data
        toast.error(data.msg, { autoClose: 5000 });
        console.log(data)
      });
  }, [history])

  const signOut = useCallback(async () => {
    localStorage.removeItem('@MonetizDB:token');
    localStorage.removeItem('@MonetizDB:user');
    setData({ token: null, user: null })
    history.push('/auth/login');
  }, [history])

  const resetPassword = async (email) => {
    return await api.post('/session/reset-password', { email })
      .then((result) => {
        return true
      }).catch((err) => {
        console.log(err.data);
        return false
      });
  }
  const verifyToken = async (token) => {
    return await api.post('/session/verify-token', { token })
      .then((result) => {
        let data = result.data
        if (data.auth)
          return true
        return data.user
      }).catch((err) => {

        return false
      });
  }
  const sendNewPassword = async (token, data) => {
    api.defaults.headers.common['x-access-token'] = token


    return await api.post(`/admin/reset-password`, data)
      .then((result) => {
        return result.data.token
      }).catch((err) => {
        console.log(err);
        return false
      });
  }


  return (
    <AuthContext.Provider value={{ user: data?.user, isAuth, signIn, signOut, resetPassword, verifyToken, sendNewPassword }}>
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