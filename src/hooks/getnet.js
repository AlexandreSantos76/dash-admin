import React, { useContext, createContext, useCallback, useState } from 'react';
import api from 'services/api';
import {useAuth} from 'hooks/auth'


const GatewayContext = createContext();

function GatewayProvider({ children }){

  const auth = useAuth()

  const callback = useCallback(async (document, type) => {
    return api.get(`/gateway/callback?document=${document}&type=${type}`)
    .then((result) => {
      return ({status:true, data:result.data})
      
    }).catch((err) => {
      console.log(err)
    });
  },[]);

  const handlePreRegisterCpf = useCallback(async (data) => {
    const preRegisterData = {
      legal_document_number: data.cpf,
      legal_name: `${data.name} ${data.surname}`,
      birth_date: data.birthdate,
      mothers_name: `${data.motherName} ${data.motherSurname}`,
      occupation: data.occupation,
      business_address: {
        mailing_address_equals: "N",
        street: data.businessAddress.street,
        number: data.businessAddress.number,
        district: data.businessAddress.neighborhood,
        city: data.businessAddress.city,
        state: data.businessAddress.state,
        postal_code: data.businessAddress.cep
      },
      mailing_address: {
        street: data.mailingAddress.street,
        number: data.mailingAddress.number,
        district: data.mailingAddress.neighborhood,
        city: data.mailingAddress.city,
        state: data.mailingAddress.state,
        postal_code: data.mailingAddress.cep,
      },
      email: data.email,
      bank_accounts: {
        type_accounts: 'unique',
        ...data.bankAccounts,
      },
      user_id: data.user_id
    }

    const response = await api.post('gateway/pre-register/pf', preRegisterData)
    
    return response.data;
  
  },[]);

  const handlePreRegisterCnpj = useCallback(async (data) => {
    const preRegisterData = {
      legal_document_number: data.cnpj,
      legal_name: data.legalName,
      trade_name: data.tradeName,
      state_fiscal_document_number: data.stateFiscalNumber,
      business_address: {
        mailing_address_equals: "N",
        street: data.businessAddress.street,
        number: data.businessAddress.number,
        district: data.businessAddress.neighborhood,
        city: data.businessAddress.city,
        state: data.businessAddress.state,
        postal_code: data.businessAddress.cep
      },
      mailing_address: {
        street: data.mailingAddress.street,
        number: data.mailingAddress.number,
        district: data.mailingAddress.neighborhood,
        city: data.mailingAddress.city,
        state: data.mailingAddress.state,
        postal_code: data.mailingAddress.cep,
      },
      email: data.email,
      bank_accounts: {
        type_accounts: 'unique',
        ...data.bankAccounts,
      },
      user_id: data.user_id
    }

    const response = await api.post('gateway/pre-register/pj', preRegisterData)
    
    return response.data;
  
  },[])

  return (
    <GatewayContext.Provider value={{callback, handlePreRegisterCpf, handlePreRegisterCnpj}}>
      {children}
    </GatewayContext.Provider>
  )
}

function useGateway(){
  const context = useContext(GatewayContext);

  if(!context){
    throw new Error('useGateway must be used within an Gateway Provider')
  }

  return context;
}

export { GatewayProvider, useGateway };
