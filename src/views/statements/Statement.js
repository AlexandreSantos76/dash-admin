import React, { useState, useEffect } from "react";
import { NavLink, Card, Container, Row, CardBody } from "reactstrap";
import Header from "components/Headers/HeaderClear";
import { statement } from "../../hooks/billings"
import moment from "moment"

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
    const [comissions, setComissions] = useState([])
    const [chargebacks, setChargebacks] = useState([])

    useEffect(() => {
        async function loadingData() {
            const init = moment().clone().startOf('month').format()
            const end = moment().format()
            let statements = await statement({ init: init, end: end })
            setTransations(statements.list_transactions)
            setComissions(statements.commission)
            setChargebacks(statements.chargeback)
        }
        loadingData();
    }, [])
    console.log(comissions);
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
                                            Chargebacks
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
                                                    <TableTransactions transactions={transactions} />
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId={2}>Comissões</TabPane>
                            <TabPane tabId={3}>Chargebacks</TabPane>
                        </TabContent>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default Statement