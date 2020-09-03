import React, {createContext, useContext, useState, useCallback} from 'react';

const UsersContext = createContext();

function UsersProvider({ children }){

  const [ selectedUserId, setSelectedUserId ] = useState(null);

  const saveSelectedUserId = useCallback((id) => {
    setSelectedUserId(id)
  },[])

  const getSelectedUserId = useCallback(() => {
    return selectedUserId;
  },[selectedUserId])


  return (
    <UsersContext.Provider value={{saveSelectedUserId, getSelectedUserId}}>
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


