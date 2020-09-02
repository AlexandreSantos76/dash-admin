import React, { useState, useEffect, useCallback} from "react";
import { useHistory } from 'react-router-dom';
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
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Button,
  UncontrolledTooltip
} from "reactstrap";
// core components

import { usePlans } from '../../hooks/plans'

import Header from "components/Headers/Header.js";

import api from '../../services/api';

import { formatPrice } from '../../utils/format'

function Plans(){


  const history = useHistory();
  const  { getPlans, handleSetPlanDetailsId } = usePlans();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadingPlans(){
      const response = await getPlans()
      setPlans(response);

      console.log(response)
    }

    loadingPlans();

    
  },[getPlans])

  const handlePlanRegister = useCallback(() => {
    history.push('/admin/plan-register')
  },[history])

  const handlePlanSettings = useCallback((plan)=> {
    console.log("ID", plan)
    handleSetPlanDetailsId(plan.id);

    history.push('/admin/plan-settings')
  },[handleSetPlanDetailsId, history])

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
                <h3 className="mb-0">Planos</h3>
                <Button color='primary' onClick={handlePlanRegister}>Cadastrar</Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome</th>
                    {/* <th scope="col">Preço</th> */}
                    <th scope="col">Número de Membros</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Users</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                    {plans.map(( plan) => (
                      <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {plan.name}
                            </span>
                          </Media>
                        </Media>
                      </th>
                     
                      <td>
                        <span className="mb-0 text-sm">
                          0
                        </span>
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={plan.active ? "bg-success" : "bg-warning"} />
                          {plan.status ? "Ativo": 'Inativo'}
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
                              href="#pablo"
                              onClick={() => handlePlanSettings(plan)}
                            >
                              Configuração
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


export default Plans;
