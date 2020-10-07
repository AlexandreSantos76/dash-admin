import React, { useContext, createContext, useCallback, useState } from 'react';
import api from 'services/api';


const GetnetContext = createContext();

function GetnetProvider({ children }){

  const [merchant, setMerchant ] = useState({
    id: ''
  })

  const cpfSituation = useCallback(async (cpf) => {
    const response = await api.get(`http://getnet/pf/callback/${merchant.id}/${cpf}`)
  },[merchant.id]);

  const handlePreRegister = useCallback(async (data) => {
    const preRegisterData = {
      merchant_id: merchant.id,
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
      acquirer_merchant_category_code: '', //FALTA,
      bank_accounts: {
        type_accounts: 'unique',
        ...data.bankAccounts,
      }
    }

    const response = await api.post('http://getnet/pf/create-presubseller', preRegisterData)
    
    return response.data;
  
  },[merchant.id])

  return (
    <GetnetContext.Provider value={{cpfSituation, handlePreRegister}}>
      {children}
    </GetnetContext.Provider>
  )
}

function useGetnet(){
  const context = useContext(GetnetContext);

  if(!context){
    throw new Error('useGetnet must be used within an Getnet Provider')
  }

  return context;
}

export { GetnetProvider, useGetnet };
