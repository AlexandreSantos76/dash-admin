
import React, { useState, useCallback, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Media,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useUsers } from '../../hooks/users';
// core components
import UserHeader from "components/Headers/UserHeader.js";
import api from "services/api";

function ClientProfile(){

  const {getSelectedUserId} = useUsers();

  const [editable, setEditable] = useState(false);

  const [client, setClient] = useState(null);
  const [plans, setPlans] = useState([]);
  const user_id = getSelectedUserId();


  const handleEditProfile = useCallback((e) => {
    e.preventDefault()
    setEditable(state => !state);
  },[]) 

  useEffect(() => {
    async function loadingData(){
      console.log("CLIENTE PROFILE", user_id)
      const response = await api.get(`/user/findOne/${user_id}`);
      const responsePlans = await api.get('/plans/list');

    
      setClient(response.data);
      setPlans(responsePlans.data);

      console.log(responsePlans.data)
    }
    loadingData();
  },[getSelectedUserId, user_id])

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Cliente</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) =>handleEditProfile(e)}
                      size="sm"
                    >
                      Editar
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {client && (
                  <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informações
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Usuário
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            value={client.name}
                            type="text"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            E-mail
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            value={client.email}
                            type="email"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            CPF
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            value={client.cpf}
                            type="text"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            celular
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            value={client.celular}
                            type="text"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  {/* <h6 className="heading-small text-muted mb-4">
                    Endereço
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Endereço
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            value={client.userAddress.address}
                            type="text"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Cidade
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={client.userAddress.city}
                            id="input-city"
                            placeholder="City"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Estado
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            value={client.userAddress.state}
                            type="text"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            CEP
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            value={client.userAddress.postcode}
                            type="number"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Plano</h6>
                  <div className="pl-lg-4">

                  <FormGroup>
                      <label>Status da Conta</label>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Ativado</option>
                          <option>Desativado</option>
                        </Input>
                    </FormGroup>


                    <FormGroup>
                      <label>Plano selecionado</label>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Monetiz Checkout</option>
                          <option>Monetiz Pay</option>
                        </Input>
                    </FormGroup>
                  </div>
                </Form>
                )}
              </CardBody>

              <CardBody>
                Vendas
                
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Data</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Users</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                    {/* {clients.map(client => (
                      <tr key={client.id}>
                      <th scope="row">


                      <td>
                      <span className="mb-0 text-sm">
                              {client.name}
                            </span>
                      </td>
     
                      </th>
                      <td>{client.date}</td>
                      <td>
                        {client.value}
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={client.active ? "bg-success" : "bg-warning"} />
                          {client.active ? "Pago": 'Inadimplente'}
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
                              onClick={(e) => e.preventDefault()}
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
                    ))} */}
                </tbody>
                </Table> 
              </CardBody>

              <CardBody>
                Chargebacks
                
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Data</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Users</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                    {/* {clients.map(client => (
                      <tr key={client.id}>
                      <th scope="row">


                      <td>
                      <span className="mb-0 text-sm">
                              {client.name}
                            </span>
                      </td>
     
                      </th>
                      <td>{client.date}</td>
                      <td>
                        {client.value}
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={client.active ? "bg-success" : "bg-warning"} />
                          {client.active ? "Pago": 'Inadimplente'}
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
                              onClick={(e) => e.preventDefault()}
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
                    ))} */}
                </tbody>
                </Table> 
              </CardBody>


            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ClientProfile;
