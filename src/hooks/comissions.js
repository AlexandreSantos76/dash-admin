import React, { useState, useContext, createContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import boleto from '../assets/img/bandeiras/boleto.svg'
import american_express from '../assets/img/bandeiras/american_express.svg';
import visa from '../assets/img/bandeiras/visa.svg';
import hiper_card from '../assets/img/bandeiras/hiper_card.svg';
import master_card from '../assets/img/bandeiras/master_card.svg';
import elo from '../assets/img/bandeiras/elo.svg';
const ComissionsContext = createContext();

function ComissionsProvider({ children }) {
    const [brands, setBrands] = useState( );
    
    return (
        <ComissionsContext.Provider value={{ brands }}>
            {children}
        </ComissionsContext.Provider>
    )
}

function useComissions() {
    const context = useContext(ComissionsContext);

    if (!context) {
        throw new Error('useComissions must be used within an PlansComissions.')
    }

    return context;
}

export { ComissionsProvider, useComissions }