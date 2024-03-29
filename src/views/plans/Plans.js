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
  Table,
  Container,
  Row,
  Button
} from "reactstrap";
// core components
import { usePlans } from '../../hooks/plans'
import Header from "components/Headers/Header.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons'

function Plans(){
  const history = useHistory();
  const  { getPlans, handleSetPlanDetailsId, deletePlan } = usePlans();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadingPlans(){
      const response = await getPlans()
      setPlans(response);
    }
    loadingPlans();    
  },[getPlans])

  const handlePlanRegister = useCallback(() => {
    history.push('/admin/plan-register')
  },[history])

  const handlePlanSettings = useCallback((plan)=> {
    handleSetPlanDetailsId(plan.id);
    history.push('/admin/plan-settings')
  },[handleSetPlanDetailsId, history])

  const handlePlanDelete = useCallback(async(id)=>{
    deletePlan(id)
    const response = await getPlans()
      setPlans(response);

  },[deletePlan, getPlans])

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
                      <tr key={plan.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {plan.name}
                            </span>
                          </Media>
                        </Media>
                      </th>
                     
                      <td>
                        <span className="mb-0 text-sm">
                          {plan.users.length}
                        </span>
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={plan.status ? "bg-success" : "bg-warning"} />
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
                             <FontAwesomeIcon icon={faCog} color="primary" className="mr-1"/>Configuração
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => {e.preventDefault(); handlePlanDelete(plan.id)}}
                            >
                              <FontAwesomeIcon icon={faTrash} color="red" className="mr-1"/> <span className="text-warning">Excluir Plano</span>
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
