import moment from 'moment';
import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import DatetimeRangePicker from 'react-datetime-range-picker';

const MonetizDateRange = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [init, setInit] = useState(moment().clone().startOf('day').format());
    const [end, setEnd] = useState(moment().format());
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const setRange = (e) => {
        setInit(moment(e.start).format());
        setEnd(moment(e.end).format())
    }
    return (
        <>
            <div style={{ width: "400px", display: "flex", justifyContent: "flex-end" }}>
                <div>
                    <div active>Hoje</div>
                    <div>Últimos 7 dias</div>
                    <div text>Últimos 30 dias</div>
                    <div disabled>Últimos 3 Meses</div>
                    <div>
                        <Dropdown direction="left" isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle>
                                Personalizado
                            </DropdownToggle>
                            <DropdownMenu>
                                <DatetimeRangePicker className="d-flex" inline={true} startDate={init} endDate={end} locale="pt-br" pickerClassName="col-6" onChange={setRange} />
                            </DropdownMenu>
                        </Dropdown></div>
                </div>
            </div>

        </>
    )
}

export default MonetizDateRange
