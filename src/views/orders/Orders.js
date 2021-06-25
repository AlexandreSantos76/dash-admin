import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import DatetimeRangePicker from 'react-datetime-range-picker';
// reactstrap components
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardFooter,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    CardBody,
} from "reactstrap";
// core components

import { useUsers } from "../../hooks/users";
import { useGateway } from "../../hooks/getnet";
import Header from "components/Headers/Header.js";
import api from "../../services/api";
import { formatCurrency } from "utils/FormateUtils";
import moment from "moment";


function Orders() {
    const gateway = useGateway();
    const history = useHistory();
    const { saveSelectedUserId } = useUsers();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState(1);
    const [init, setInit] = useState(moment().clone().startOf('day').format());
    const [end, setEnd] = useState(moment().format());
    const setRange = (e) => {
        setInit(moment(e.start).format());
        setEnd(moment(e.end).format())
    }



    useEffect(() => {
        async function loadingOrders() {
            const response = await api.get(`/orders/admin/list`, { params: { page, limit } });
            setOrders(response.data);
        }
        loadingOrders();
    }, [filter, page, limit]);

    const handleProfile = useCallback(
        (client) => {
            saveSelectedUserId(client.id);
            history.push("/admin/client-profile");
        },
        [history, saveSelectedUserId]
    );

    const handleCallback = async (document, type, index) => {
        let { status, data } = await gateway.callback(document, type);
        console.log(status);
        if (status) {
            let newArr = [...orders];
            newArr[index].subseller.enabled = data.enabled;
            newArr[index].subseller.status = data.status;
            console.log(newArr[index]);
            setOrders(newArr);
        }
    };

    const handleFilter = async (filter) => {
        setFilter(filter);
    };

    const handleNewClient = useCallback(() => {
        history.push(`/admin/client-register`);
    }, [history]);

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Pedidos</h3>
                                <div className="d-flex">
                                    <DatetimeRangePicker className="d-flex" inline={true} startDate={init} endDate={end} locale="pt-br" pickerClassName="pl-0 pr-1" onChange={setRange} inputProps={{ className: "form-control font-weight-bold", Style: "width: auto" }} />

                                    <Button color="info" >
                                        <i className="fas fa-filter" /> Filtros
                                    </Button>
                                </div>
                            </CardHeader>

                            <Table striped className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Pedido</th>
                                        <th scope="col">Vendedor</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Criado em</th>
                                        <th scope="col">Atualizado em</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td>
                                                <span className="mb-0 text-sm"><a href={`orders/${order.id}`}>{order.id}</a></span>
                                            </td>
                                            <th scope="row">
                                                <span className="mb-0 text-sm">{order.store.user.name}</span>
                                            </th>
                                            <th scope="row">
                                                <span className="mb-0 text-sm">{order.customer.name}</span>
                                            </th>
                                            <td>{formatCurrency(order.totalValue)}</td>
                                            <td>{moment(order.createdAt).format("DD/MM/YYYY HH:MM")}</td>

                                            <td>{moment(order.updatedAt).format("DD/MM/YYYY HH:MM")}</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i
                                                        className={
                                                            order.statusId === 4
                                                                ? "bg-success"
                                                                : "bg-warning"
                                                        }
                                                    />
                                                    {order.status.name}
                                                </Badge>
                                            </td>

                                            <td className="text-right">
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem onClick={() => handleProfile()}>
                                                            Ver perfil
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={(e) => {
                                                                e.preventDefault();

                                                            }}
                                                        >
                                                            Atualizar Situação
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Orders;
