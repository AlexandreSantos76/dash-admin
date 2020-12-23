import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from 'react-router-dom'

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  CardBody
} from "reactstrap";
// core components

import { useUsers } from '../../hooks/users'
import { useGateway } from '../../hooks/getnet'

import Header from "components/Headers/Header.js";

import api from '../../services/api';

function Clients() {
  const gateway = useGateway()
  const history = useHistory();
  const { saveSelectedUserId } = useUsers();

  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState(1)


  useEffect(() => {
    async function loadingClients() {
      const response = await api.get(`/user?filter=${filter}`);
      setClients(response.data);
    }
    loadingClients();
  }, [filter])

  const handleProfile = useCallback((client) => {
    saveSelectedUserId(client.id);
    history.push('/admin/client-profile')
  }, [history, saveSelectedUserId])

  const handleCallback = async (document, type, index) => {
    let { status, data } = await gateway.callback(document, type)
    console.log(status);
    if (status) {
      let newArr = [...clients]
      newArr[index].subseller.enabled = data.enabled
      newArr[index].subseller.status = data.status
      console.log(newArr[index]);
      setClients(newArr)
    }
  }

  const handleFilter = async (filter) => {
    setFilter(filter)
  }

  const handleNewClient = useCallback(() => {
    history.push(`/admin/client-register`)
  }, [history])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center justify-content-between" >
                <h3 className="mb-0">Clientes</h3>
                <div>
                  <Button color='primary' onClick={handleNewClient}>Cadastrar</Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="status d-flex ">
                  <a className={`order-status order-status-paid`} href="#mon" onClick={e => { e.preventDefault(); handleFilter(1) }} >
                    <strong>Clientes Ativos</strong>
                  </a>
                  <a className={`order-status order-status-waiting_payment`} href="#anc" onClick={e => { e.preventDefault(); handleFilter(2) }}>
                    <strong>Clientes Aguardando Liberação</strong>
                  </a>
                  <a className={`order-status order-status-cancelled`} href="#mon" onClick={e => { e.preventDefault(); handleFilter(3) }}>
                    <strong>Clientes Cancelados</strong>
                  </a>
                </div>
              </CardBody>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Empresa</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Pagamento</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={client.id}>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          {client.name}
                        </span>
                      </th>
                      <td>{client.plan ? client.plan.name : "Sem Plano"}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={client.paymentStatus === 'ok' ? "bg-success" : "bg-warning"} />
                          {client.paymentStatus}
                        </Badge>
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={client.subseller.enabled === "S" ? "bg-success" : "bg-warning"} />
                          {client.subseller.status}
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
                            <DropdownItem
                              onClick={() => handleProfile(client)}
                            >
                              Ver perfil
                            </DropdownItem>
                            <DropdownItem
                              onClick={
                                e => {
                                  e.preventDefault()
                                  handleCallback(client.document, client.type, index)
                                }
                              }
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
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#"
                        onClick={e => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                   
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={e => e.preventDefault()}
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


export default Clients;
