import React, { useState, useEffect, useCallback} from "react";
import { useHistory } from 'react-router-dom'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row
} from "reactstrap";
// core components
import {format, parseISO} from 'date-fns'

import {formatPrice} from '../../utils/format'
import { useChargebacks } from '../../hooks/chargebacks';

import Header from "components/Headers/Header";

import api from '../../services/api';


function Chargebacks(){

  const history = useHistory();
  const { saveSelectedChargeback } = useChargebacks();

  const [chargebacks, setChargebacks] = useState([]);
  const [chargebacksOpen, setChargebacksOpen] = useState([]);
  useEffect(() => {
   
    async function loadingData(){
      const response = await api.get('/chargebacks/list');
      const responseOpen = await api.get('/chargebacks/list-status-open');

      setChargebacks(response.data);
      setChargebacksOpen(responseOpen.data);

    }

    loadingData();
  },[])

  const handleSettings = useCallback((chargeback) => {
    saveSelectedChargeback(chargeback.id)
    history.push('/admin/chargeback-settings')
  },[history, saveSelectedChargeback])

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
                <h3 className="mb-0">Chargebacks</h3>
                {/* <Button color='primary' onClick={handleNewClient}>Cadastrar</Button> */}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data de requisição</th>
                    <th scope="col">Data de limite</th>
                    <th scope="col">Status pagamento</th>
                    {/* <th scope="col">Users</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                    {chargebacks.map(chargeback => (
                      <tr key={chargeback.id}>
                     
                      <td>{chargeback.user.name}</td>
                      <th scope="row">
                        <td>
                        <span className="mb-0 text-sm">
                                {formatPrice(chargeback.value)}
                              </span>
                        </td>
                      </th>
                      <td>{format(parseISO(chargeback.createdAt), 'dd/MM/yyyy')}</td>
                      <td>{format(parseISO(chargeback.due_date), 'dd/MM/yyyy')}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={chargeback.status ? "bg-success" : "bg-warning"} />
                          {chargeback.status ? "Pago": "Aguardando"}
                        </Badge>
                      </td>

  
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={() => handleSettings(chargeback)}
                            >
                              Ver perfil
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
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
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
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

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center justify-content-between" >
                <h3 className="mb-0">Chargebacks em Aberto</h3>
                {/* <Button color='primary' onClick={handleNewClient}>Cadastrar</Button> */}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data de requisição</th>
                    <th scope="col">Data de limite</th>
                    <th scope="col">Status pagamento</th>
                    {/* <th scope="col">Users</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                    {chargebacksOpen.map(chargebackOpen => (
                      <tr key={chargebackOpen.id}>
                     
                      <td>{chargebackOpen.user.name}</td>
                      <th scope="row">
                        <td>
                        <span className="mb-0 text-sm">
                                {formatPrice(chargebackOpen.value)}
                              </span>
                        </td>
                      </th>
                      <td>{format(parseISO(chargebackOpen.createdAt), 'dd/MM/yyyy')}</td>
                      <td>{format(parseISO(chargebackOpen.due_date), 'dd/MM/yyyy')}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={chargebackOpen.status ? "bg-success" : "bg-warning"} />
                          {chargebackOpen.status ? "Pago": "Aguardando"}
                        </Badge>
                      </td>

  
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={handleSettings}
                            >
                              Ver perfil
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
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
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
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


export default Chargebacks;
