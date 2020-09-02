import React, {useState, useContext, createContext, useCallback} from 'react'

import api from '../services/api';

const PlansContext = createContext();

function PlansProvider({ children }) {

  const [plans, setPlans] = useState([]);
  const [planSettingsId, setPlanSettingsId] = useState(null);

  const getPlans = useCallback(async () => {
    
    const response = await api.get('/plans/list');

    setPlans(response.data);
    console.log("DENTRO DO HOOK", response.data)
    return response.data;

  },[])

  const savePlans = useCallback(async (data) => {
    try {
      console.log(data)
      const response = await api.post('/plans/add', data)

      setPlans(state => [...state, response.data])
    } catch (err){
      console.log(err);
    }
  },[])


  const handleSetPlanDetailsId = useCallback((id) => {
    setPlanSettingsId(id);
  },[])

  const handleGetPlanDetailsId = useCallback(() => {
    return planSettingsId;
  },[planSettingsId])

  return (
    <PlansContext.Provider value={{plans, getPlans, savePlans, handleSetPlanDetailsId, handleGetPlanDetailsId}}>
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