import React, { useContext, createContext, useCallback , useState} from 'react';
import api from 'services/api';

const ChargebacksContext = createContext();

function ChargebacksProvider({ children }){

  const [selectedChargebackId, setSelectedChargebackId] = useState(() => {
    const selectedId = localStorage.getItem('@Monetiz-dashboard:chargeback-selected');
    
    return selectedId;
  });

  const saveSelectedChargeback = useCallback((id) => {
    setSelectedChargebackId(id);
    localStorage.setItem('@Monetiz-dashboard:chargeback-selected', id);
  },[])

  const getSelectedChargeback = useCallback(() => {
    return selectedChargebackId
  },[selectedChargebackId])

  return (
    <ChargebacksContext.Provider value={{ saveSelectedChargeback, getSelectedChargeback }}>
      {children}
    </ChargebacksContext.Provider>
  )
}

function useChargebacks(){
  const context = useContext(ChargebacksContext);

  if(!context){
    throw new Error('useChargebacks must be used within an ChargebacksProvider')
  }

  return context;
}

export { ChargebacksProvider, useChargebacks};