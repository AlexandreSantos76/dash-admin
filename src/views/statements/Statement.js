import React, { useState, useEffect } from "react";
import { NavLink, Card, Container, Row, CardBody } from "reactstrap";
import Header from "components/Headers/HeaderClear";
import { statement, refused } from "../../hooks/billings"
import moment from "moment"
import DatetimeRangePicker from 'react-datetime-range-picker';

import Col from "reactstrap/lib/Col";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import classnames from 'classnames';
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";
import TableTransactions from "components/Statements/TableTransactions"


const Statement = () => {
    const [activeTable, setActiveTable] = useState(1)
    const [transactions, setTransations] = useState([])
    const [orders, setOrders] = useState([])
    const [comissions, setComissions] = useState([])
    const [chargebacks, setChargebacks] = useState([])
    const [init, setInit] = useState(moment().clone().startOf('month').format())
    const [end, setEnd] = useState(moment().format())

    useEffect(() => {
        async function loadingData() {
            let statements = await statement({ init: init, end: end })
            let refuseds = await  refused({ init: init, end: end })
            setTransations(statements.transactions.list_transactions)
            setComissions(statements.transactions.commission)
            setChargebacks(statements.transactions.chargeback)
            setOrders(statements.orders)
        }
        loadingData();
    }, [init, end])
    const setRange = (e) => {
       setInit(moment(e.start).format());
       setEnd(moment(e.end).format())
    }
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="justify-content-md-center pt-8">
                    <Col sm="11" className="bg-transparent  card p-4" style={{ border: "none" }}>
                        <Row >
                            <Col sm="12">

                                <Nav className="order-tab" tabs style={{ borderBottom: 0 }}>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTable === 1 })}
                                            onClick={() => { setActiveTable(1); }}>
                                            Transações
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTable === 2 })}
                                            onClick={() => { setActiveTable(2); }}>
                                            Comissões
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTable === 3 })}
                                            onClick={() => { setActiveTable(3); }}>
                                            Transações Negadas
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                        </Row>
                        <TabContent activeTab={activeTable}>
                            <TabPane tabId={1}>
                                <Row>
                                    <Col>
                                        <Card style={{ border: "0", boxShadow: "none" }}>
                                            <CardBody>
                                                <Row>
                                                    <Col>
                                                    <Row>
                                                        <Col xs="6">
                                                        <DatetimeRangePicker className="d-flex" inline={true} startDate={init} endDate={end} locale="pt-br" pickerClassName="col-6" onChange={setRange} />
                                                        </Col>
                                                    </Row>
                                                    <TableTransactions transactions={transactions} orders={orders} comissions={comissions} />
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId={2}>Comissões</TabPane>
                            <TabPane tabId={3}>Transações Negadas</TabPane>
                        </TabContent>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default Statement