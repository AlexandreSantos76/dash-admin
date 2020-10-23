import React from 'react'
import { CustomInput } from 'reactstrap'

export const Checkbox = (props => {
    return (
        <li>
            <CustomInput key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} label={props.value} value={props.id} />
        </li>
    )
})