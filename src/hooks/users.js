import React, { createContext, useContext, useState, useCallback } from 'react';
import api from 'services/api';
import { toast } from 'react-toastify';
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
import { typesGetnet } from 'utils/typesGetnet';
import { useHistory } from 'react-router-dom'

const UsersContext = createContext();

function UsersProvider({ children }) {

  const history = useHistory();

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
      const { data: response } = await api.post('/users', data)
      toast.success("Usuário cadastrado com sucesso.", { autoClose: 10000 });
      history.push(`/admin/client/${response.userId}`)
    } catch (error) {
      if (error.response.status === 400) {
        let data = error.response.data
        if (data.ModelState) {
          let keys = Object.keys(data.ModelState)
          keys.forEach(key => {
            let arrayKey = key.split(".")
            let label = typesGetnet[arrayKey[0]]
            toast.error(`Campo ${label} inválido`, { autoClose: false })
          })
        }
        if (data.errors) {
          data.errors.forEach(error => {
            toast.error(error, { autoClose: false })
          })
        }
      }
      if (error.response.status === 401) {
        let errors = error.response.data.error
        errors.forEach(rs => {
          toast.error(rs.message)
        })
      }
      if (error.response.status === 402) {
        toast.error("Ocorreu um erro cadastro getnet")
      }
      if (error.response.status === 403) {
        let msg = error.response.data
        const formattedCode = prettier.format(msg, {
          parser: "babel",
          plugins: [babylon]
        });
        toast.error(formattedCode)
      }
    }
  }, [history])

  const updateUser = useCallback(async (data) => {

    try {
      await api.put(`/users/${data.user.id}`, data);
      toast.success("Usuário atualizado.");
    } catch (error) {
      if (error.response.status === 400) {
        let data = error.response.data
        if (data.ModelState) {
          let keys = Object.keys(data.ModelState)
          keys.forEach(key => {
            let arrayKey = key.split(".")
            let label = typesGetnet[arrayKey[0]]
            toast.error(`Campo ${label} inválido`, { autoClose: false })
          })
        }
        if (data.errors) {
          data.errors.forEach(error => {
            toast.error(error, { autoClose: false })
          })
        }
      }
      if (error.response.status === 401) {
        let errors = error.response.data.error
        errors.forEach(rs => {
          toast.error(rs.message)
        })
      }
      if (error.response.status === 402) {
        toast.error("Ocorreu um erro cadastro getnet")
      }
      if (error.response.status === 403) {
        let msg = error.response.data
        const formattedCode = prettier.format(msg, {
          parser: "babel",
          plugins: [babylon]
        });
        toast.error(formattedCode)
      }
    }
  }, [])

  const updateStatus = useCallback(async (userId, data) => {

    try {
      await api.put(`/users/status/${userId}`, data);

      toast.success("Usuário atualizado.");
    } catch (err) {
      console.log(err);
      toast.error("Tente novamente.")
    }
  }, [])



  const getUser = useCallback(async (id) => {
    const response = await api.get(`/users/${id}`);
    return response
  },
    [],
  )

  return (
    <UsersContext.Provider value={{ saveSelectedUserId, getSelectedUserId, updateUser, userRegister, getUser, updateStatus }}>
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


