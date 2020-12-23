import React, {useState, useContext, createContext, useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/api';

const PlansContext = createContext();

function PlansProvider({ children }) {

  const history = useHistory();

  const [plans, setPlans] = useState([]);
  const [planSettingsId, setPlanSettingsId] = useState(() => {
    const selectedId = localStorage.getItem('@Monetiz-dashboard:plan-selected');

    return selectedId;
  });
  const handleSetPlanDetailsId = useCallback((id) => {
    setPlanSettingsId(id);
    localStorage.setItem('@Monetiz-dashboard:plan-selected', id);
  },[])

  const getPlans = useCallback(async () => {
    const response = await api.get('/plans/list');
    setPlans(response.data);
    return response.data;

  },[])

  const getPlan = useCallback(async (id) => {
    const response =  await api.get(`plans/show/${id}`);
    return response.data
  },[])

  const savePlans = useCallback(async (data) => {
    try {
      const response = await api.post('/plans/add', data)
      setPlans(state => [...state, response.data]);
      toast.success("Plano cadastrado !");
      handleSetPlanDetailsId(response.data.id);
      history.push('/admin/plan-settings')
    } catch (err){
      console.log(err);
      toast.error("Tente novamente !");
    }
  },[history])

  const updatePlan = useCallback(async(data) => {
    try {
      const response = await api.put(`/plans/update/${data.id}`, data);
      toast.success("Plano atualizado !");
    } catch(err){
      console.log(err);
      toast.error("Tente novamente !");
    }
  },[]);

  const deletePlan = useCallback(async(id) => {
    try {
      await api.delete(`/plans/delete/${id}`);
      toast.success("Plano deletado !");
      history.push('/admin/plans/')
      
    } catch(err){
      console.log(err)
      toast.error("Tente novamente !");
    }
  },[history])

  


  

  const handleGetPlanDetailsId = useCallback(() => {
    return planSettingsId;
  },[planSettingsId])

  return (
    <PlansContext.Provider value={{plans, getPlans, getPlan, savePlans, updatePlan, deletePlan, handleSetPlanDetailsId, handleGetPlanDetailsId}}>
      {children}
    </PlansContext.Provider>
  )
}

function usePlans(){
  const context = useContext(PlansContext);

  if(!context){
    throw new Error('usePlans must be used within an PlansProvider.')
  }

  return context;
}

export { PlansProvider, usePlans }