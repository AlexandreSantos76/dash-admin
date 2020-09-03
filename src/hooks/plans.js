import React, {useState, useContext, createContext, useCallback} from 'react'
import { useHistory } from 'react-router-dom'

import api from '../services/api';

const PlansContext = createContext();

function PlansProvider({ children }) {

  const history = useHistory();

  const [plans, setPlans] = useState([]);
  const [planSettingsId, setPlanSettingsId] = useState(null);

  const getPlans = useCallback(async () => {

   
    const response = await api.get('/plans/list', {
      headers: {
        'x-access-token': 'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJvdGF2aW9AdGVzdGUuY29tLmJyIiwibmFtZSI6Ik90YXZpbyBUZXN0ZSIsInNob3AiOjYsImF2YXRhciI6bnVsbCwiaWF0IjoxNTk5MTY3MDEyLCJleHAiOjE1OTkyNTM0MTJ9.OZHQ3lNLy1CVfXAOp5x4ehnEeoWCV3CamVd73vU4N3g'
      }
    });

    setPlans(response.data);
    return response.data;

  },[])

  const savePlans = useCallback(async (data) => {
    try {
      const response = await api.post('/plans/add', data)

      setPlans(state => [...state, response.data])
    } catch (err){
      console.log(err);
    }
  },[])

  const updatePlan = useCallback(async(data) => {
    try {
      const response = await api.put(`/plans/update/${data.id}`, data);
    } catch(err){
      console.log(err);
    }
  },[]);

  const deletePlan = useCallback(async(id) => {
    try {
      await api.delete(`/plans/delete/${id}`);
      history.push('/admin/plans/')
      
    } catch(err){
      console.log(err)
    }
  },[history])


  const handleSetPlanDetailsId = useCallback((id) => {
    setPlanSettingsId(id);
  },[])

  const handleGetPlanDetailsId = useCallback(() => {
    return planSettingsId;
  },[planSettingsId])

  return (
    <PlansContext.Provider value={{plans, getPlans, savePlans, updatePlan, deletePlan, handleSetPlanDetailsId, handleGetPlanDetailsId}}>
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