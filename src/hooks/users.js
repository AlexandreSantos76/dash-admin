import React, { createContext, useContext, useState, useCallback } from 'react';
import api from 'services/api';
import { toast } from 'react-toastify';

const UsersContext = createContext();

function UsersProvider({ children }) {

  const [selectedUserId, setSelectedUserId] = useState(() => {
    const selectedId = localStorage.getItem('@Monetiz-dashboard:user-selected');

    return selectedId;
  });

  const saveSelectedUserId = useCallback((id) => {
    setSelectedUserId(id);
    localStorage.setItem('@Monetiz-dashboard:user-selected', id)
  }, [])

  const getSelectedUserId = useCallback(() => {
    return selectedUserId;
  }, [selectedUserId])


  const userRegister = useCallback(async (data) => {
    try {
      const response = await api.post('/user/add', data)
      console.log(response);
      toast.success("Usuário cadastrado com sucesso.", { autoClose: 10000 });
    } catch (error) {
      if (error.response.status === 401) {
        let errors = error.response.data.error
        errors.forEach(rs => {
          toast.error(rs.message)
        })
      }
      if (error.response.status === 402){
          toast.error("Ocorreu um erro cadastro getnet" )
      }
    }






  }, [])

  const updateUser = useCallback(async (data) => {

    try {
      await api.put("/user/update", data);
      toast.success("Usuário atualizado.");
    } catch (err) {
      toast.error("Tente novamente.")
    }
  }, [])



  const getUser = useCallback(async (id) => {
    const response = await api.get(`/user/find/${id}`);
    return response
  },
    [],
  )

  return (
    <UsersContext.Provider value={{ saveSelectedUserId, getSelectedUserId, updateUser, userRegister, getUser }}>
      {children}
    </UsersContext.Provider>
  )

}

function useUsers() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUsers must be used within an UsersProvider.')
  }

  return context;
}

export { UsersProvider, useUsers }


