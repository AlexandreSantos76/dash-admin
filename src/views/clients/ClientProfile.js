
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

import { format, parseISO, isAfter } from 'date-fns';
import { formatPrice } from '../../utils/format';
import { useUsers } from '../../hooks/users';
// core components
import UserHeader from "components/Headers/UserHeader.js";
import api from "services/api";

function ClientProfile(){

  const {getSelectedUserId, updateUser } = useUsers();

  const [editable, setEditable] = useState(false);

  const [client, setClient] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [status, setStatus] = useState("");
  const [sales, setSales] = useState([]);
  const [chargebacks, setChargebacks] = useState([]);



  const [plans, setPlans] = useState([]);
  const [planSelected, setPlanSelected] = useState(null);
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

    
      setClient(response.data.user);
      setName(response.data.user.name);
      setCpf(response.data.user.cpf);
      setCelular(response.data.user.celular);
      setEmail(response.data.user.email);
      setStatus(response.data.user.status);
      setPlanSelected(response.data.user.plan_id);
      setSales(response.data.user.store.orders);
      setChargebacks(response.data.user.chargebacks);

      setPlans(responsePlans.data);
      console.log(response.data)
      console.log(responsePlans.data)
    }
    loadingData();
  },[getSelectedUserId, user_id])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const data = {
      id:client.id,
      name,
      email,
      cpf,
      celular,
      status,
      plan_id: planSelected
    }
    updateUser(data)
  },[celular, client.id, cpf, email, name, planSelected, status, updateUser])

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
                  <Form onSubmit={(e) => handleSubmit(e)} id="form">
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
                            value={name}
                            type="text"
                            disabled={!editable}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            type="email"
                            disabled={!editable}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={cpf}
                            type="text"
                            disabled={!editable}
                            onChange={(e) => setCpf(e.target.value)}
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
                            value={celular}
                            type="text"
                            disabled={!editable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                   
                   {
                     client.userAddress && (
                       <>
                      <h6 className="heading-small text-muted mb-4">
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
                              type='text'
                              disabled={!editable}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div> 
                    </> 
                     )
                   }

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Plano</h6>
                  <div className="pl-lg-4">

                  <FormGroup>
                      <label>Status da Conta</label>
                        <Input 
                          type="select" 
                          name="select" 
                          id="exampleSelect"
                          onChange={e => setStatus(e.target.value)}
                        >
                          <option value={true} selected={status === true}>Ativado</option>
                          <option value={false} selected={status === false}>Desativado</option>
                        </Input>
                    </FormGroup>


                    <FormGroup>
                      <label>Plano selecionado</label>
                        <Input 
                          type="select" 
                          name="select" 
                          id="exampleSelect" 
                          onChange={(e) => setPlanSelected(e.target.value)}>
                          {/* <option>Monetiz Checkout</option>
                          <option>Monetiz Pay</option> */}
                          <option selected={planSelected === null}>Sem plano</option>
                          {plans.map(plan => (
                            <option value={plan.id} selected={planSelected === plan.id}>{plan.name}</option>
                          ))}
                        </Input>
                    </FormGroup>
                  </div>
                </Form>
                )}

              <Col className='d-flex justify-content-center'>
                    <Button color="primary" className='self-align-center' type='submit' form='form'>
                      Confirmar
                    </Button>
              </Col>
              </CardBody>


              <CardBody>
                Vendas
                
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data</th>
                    {/* <th scope="col">Status</th>
                    {/* <th scope="col">Users</th> 
                    <th scope="col" /> */}
                  </tr>
                </thead>
                <tbody>
                  
                    {sales.map(sale => (
                      <tr key={sale.id}>
                      <th scope="row">


                      <td>
                      <span className="mb-0 text-sm">
                              {sale.valueTotal}
                            </span>
                      </td>
     
                      </th>
                      <td>{sale.date}</td>
                      <td>
                        {format(sale.createdAt, 'dd/MM/YYYY')}
                      </td>
{/* 
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={sale.active ? "bg-success" : "bg-warning"} />
                          {sale.active ? "Pago": 'Inadimplente'}
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
                      </td> */}
                    </tr>
                    ))}
                </tbody>
                </Table> 
              </CardBody>

              <CardBody>
                Chargebacks
                
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
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
                     
                      <td>{chargeback.id}</td>
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
{/*   
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
                      </td> */}
                    </tr>
                    ))} 
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
