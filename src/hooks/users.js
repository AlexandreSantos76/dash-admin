import React, {createContext, useContext, useState, useCallback} from 'react';
import api from 'services/api';
import { toast } from 'react-toastify';

const UsersContext = createContext();

function UsersProvider({ children }){

  const [ selectedUserId, setSelectedUserId ] = useState(() => {
    const selectedId = localStorage.getItem('@Monetiz-dashboard:user-selected');
    
    return selectedId;
  });

  const saveSelectedUserId = useCallback((id) => {
    setSelectedUserId(id);
    localStorage.setItem('@Monetiz-dashboard:user-selected', id)
  },[])

  const getSelectedUserId = useCallback(() => {
    return selectedUserId;
  },[selectedUserId])


  const userRegister = useCallback(async (data) => {
    const response = await api.post('/user/add', data);
    return response.data;
  })

  const callbackSituation = useCallback (async (data) => {
    const response = await api.post('/user/add', data);
    return response.data;
  })

  const updateUser = useCallback( async (data) => {

    try {
      await api.put(`/user/updateOne/${data.id}`, data);
      toast.success("Usuário atualizado.");
    } catch(err){
      toast.error("Tente novamente.")
    }
  },[])

  return (
    <UsersContext.Provider value={{saveSelectedUserId, getSelectedUserId, updateUser, userRegister}}>
      {children}
    </UsersContext.Provider>
  )
  
}

function useUsers(){
  const context = useContext(UsersContext);

  if(!context){
    throw new Error('useUsers must be used within an UsersProvider.')
  }

  return context;
}

export { UsersProvider, useUsers }


