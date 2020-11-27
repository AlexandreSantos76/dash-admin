import React, { useState, useEffect, useCallback } from "react";


import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';


const ClientTable = (clients, cols) => {
    const [colluns, setColluns] = useState(cols)
    const [data, setClients] = useState(clients)

    return (
        <>
            <BootstrapTable data={data} columns={colluns} />
        </>
    )
}

export default ClientTable