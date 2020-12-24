
import React, { useState, useEffect } from "react";

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
  Badge,
  Label,
  Alert
} from "reactstrap";

import { format, parseISO, isAfter } from 'date-fns';
import { formatPrice } from '../../utils/format';
import { useUsers } from '../../hooks/users';
import {usePlans} from '../../hooks/plans'
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

// core components
import UserHeader from "components/Headers/Header";

function ClientProfile(){
  const { register, handleSubmit } = useForm();
  const {getSelectedUserId, updateUser, getUser } = useUsers();
  const {getPlans} = usePlans();
  const [isCpf, setIsCpf] = useState(false);
  const [client, setClient] = useState({});
  const [address, setAddress] = useState({});
  const [banks, setBanks] = useState({})
  const [sales, setSales] = useState([]);
  const [chargebacks, setChargebacks] = useState([]);
  const [plans, setPlans] = useState([]);
  const user_id = getSelectedUserId();
  useEffect(() => {
    async function loadingData(){
      const response = await getUser(user_id );
      const responsePlans = await getPlans();  
      let user = response.data.user
      user.subsellerId = response.data.user.subseller.subsellerId   
      setClient(user);
      setAddress(response.data.user.addresses[0])
      setBanks(response.data.user.banks[0])
      setSales(response.data.user.store.orders);
      setChargebacks(response.data.user.chargebacks);
      setPlans(responsePlans);
      response.data.user.type === "pf"? setIsCpf(true):setIsCpf(false)
    }
    loadingData();
  },[getSelectedUserId, user_id, getUser,getPlans])

  const onSubmit = (data) => {
    let {legalName, tradeName, document, stateFiscalDocument, phone, mobile, email,planId, number, neighborhood, city, state, postcode, complement, codeBank, agency, account, accountType, accountDigit } = data
    let userData = { id:user_id,legalName, tradeName, document, stateFiscalDocument, phone, mobile, email,planId,type: isCpf ? "pf" : "pj" }
    
    let addresses = { id:address.id,name: "Bussines Address", address:data.address, number, neighborhood, city, state, postcode, complement }
    
    let bankAccounts = {
      type_accounts: "unique",
      unique_account: {id:banks.id, codeBank, agency, account, accountType, accountDigit }
    }
    userData.mobile = userData.mobile.replace(/\D/g, "")
    userData.document = client.document
    userData.stateFiscalDocument = client.stateFiscalDocument
    userData.phone = userData.phone.replace(/\D/g, "")
    addresses.postcode = addresses.postcode.replace(/\D/g, "")
    let dataSubmit = {
      user: userData,
      mailingAddressEquals: "S",
      addresses: [addresses],
      bankAccounts: bankAccounts,
      subsellerId: client.subsellerId
    }
    updateUser(dataSubmit)
  }

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
                  
                </Row>
              </CardHeader>
              <CardBody>
                {client && (
                  <Form onSubmit={handleSubmit(onSubmit)}>                  
                  
                  <h6 className="heading-small text-muted mb-4">
                    Informações
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-Label" for="input-name">{isCpf ? "Nome" : "Razão Social"}</Label>
                          <Input
                            className="form-control-alternative"
                            name="legalName"
                            id="input-name"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={client.legalName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-Label" for='input-email'>Email</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="exemplo@monetiz.com.br"
                            name="email"
                            type="email"
                            innerRef={register({ required: true })}
                            defaultValue={client.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-Label" for="input-mobile">
                            Celular
                                </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-mobile"
                            name="mobile"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={client.mobile}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-Label" for="input-phone">
                            Telefone Comercial
                                </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            name="phone"
                            type="text"
                            innerRef={register({ required: false })}
                            defaultValue={client.phone}
                          />
                        </FormGroup>

                      </Col>
                    </Row>
                    {
                      isCpf && (
                        <>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <Label className="form-control-Label" for="input-cpf">CPF</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-cpf"
                                  name="document"
                                  type="text"
                                  disabled={true}
                                  innerRef={register({ required: true })}
                                  defaultValue={client.document}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <Label className="form-control-Label" for="input-occupation">
                                  Ocupação/Profissão
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-occupation"
                                  name="occupation"
                                  type="text"
                                  innerRef={register({ required: true })}
                                  defaultValue={client.occupation}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <Label className="form-control-Label" for="input-mothername">
                                  Nome da Mãe
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  name="mothername"
                                  id="input-mothersName"
                                  type="text"
                                  innerRef={register({ required: true })}
                                  defaultValue={client.motherName}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <Label className="form-control-Label" for="input-birthday">
                                  Data de nascimento
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-birthday"
                                  name="birthdate"
                                  type="date"
                                  innerRef={register({ required: true })}
                                  defaultValue={client.birthdate}
                                />

                              </FormGroup>
                            </Col>
                          </Row>

                        </>
                      )
                    }

                    {
                      !isCpf && (
                        <>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <Label
                                  className="form-control-Label"
                                  for="input-cnpj"
                                >
                                  CNPJ
                              </Label>
                                <Input
                                  className="form-control-alternative"
                                  name="document"
                                  id="input-cnpj"
                                  type="text"
                                  disabled={true}
                                  innerRef={register({ required: true })}
                                  defaultValue={client.document}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>

                                <Label
                                  className="form-control-Label"
                                  for="input-state-fiscal"
                                >
                                  Inscrição estadual
                              </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-state-fiscal"
                                  name="stateFiscalDocument"
                                  innerRef={register({ required: true })}
                                  type="text"
                                  disabled={true}
                                  defaultValue={client.stateFiscalDocument}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>

                            <Col lg="6">
                              <FormGroup>

                                <Label
                                  className="form-control-Label"
                                  for="input-tradename"
                                >
                                  Nome fantasia
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-tradename"
                                  name="tradeName"
                                  innerRef={register({ required: true })}
                                  type="text"
                                  defaultValue={client.tradeName}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6"></Col>
                          </Row>
                        </>
                      )
                    }

                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Endereço
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-address"
                          >
                            Endereço
                          </Label>
                          <Input
                            className="form-control-alternative"
                            name="address"
                            id="input-address"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={address.address}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>

                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-number"
                          >
                            Número
                          </Label>
                          <Input
                            className="form-control-alternative"
                            name="number"
                            id="input-number"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={address.number}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-neighborhood"
                          >
                            Bairro
                          </Label>
                          <Input
                            className="form-control-alternative"
                            name="neighborhood"
                            id="input-neighborhood"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={address.neighborhood}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-complement"
                          >
                            Complemento
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-complement"
                            name="complement"
                            type="text"
                            innerRef={register()}
                            defaultValue={address.complement}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-city"
                          >
                            Cidade
                          </Label>
                          <Input
                            className="form-control-alternative"
                            name="city"
                            id="input-city"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={address.city}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-state"
                          >
                            Estado
                          </Label>
                          <Input
                            className="form-control-alternative"
                            name="state"
                            id="input-state"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={address.state}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-postcode"
                          >
                            CEP
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-postcode"
                            name="postcode"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={address.postcode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Conta bancária</h6>
                  <div className="pl-lg-4">
                  <Row>
                      <Col>
                        <Alert color="info">
                          <FontAwesomeIcon icon={faInfoCircle} color="info" /> <strong>Regras Número da Conta</strong><br />
                          <br />
                          Deve conter somente digitos numéricos; Para contas com domicílio na Caixa Econômica Federal, o preenchimento deve seguir o seguinte modelo:<br />
                          <br />
                              São 3 dígitos para o tipo de conta, 8 dígitos para a conta, os tipos de conta são os seguintes:<br />
                              001 – Conta Corrente de Pessoa Física;<br />
                              003 – Conta Corrente de Pessoa Jurídica;<br />
                              013 – Poupança de Pessoa Física;<br />
                              022 – Poupança de Pessoa Jurídica.<br />
                          <br />
                              Exemplo: no campo de conta, será necessário colocar o tipo de conta (sem os zeros à esquerda) e o número da conta: 100000123.<br />
                          <br />
                          <FontAwesomeIcon icon={faInfoCircle} color="info" /> <strong>Regras Dígito da Conta</strong><br />
                          <br />
                          Deve conter 1 digito numérico; Caso o dígito da conta seja X, substitua por 0.

                        </Alert>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="2">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                          >
                            Código do banco
                                  </Label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Banco"
                            name="codeBank"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={banks.codeBank}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <Label className="form-control-Label">
                            Agência
                                  </Label>
                          <Input
                            className="form-control-alternative"
                            name="agency"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={banks.agency}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                          >
                            Número da conta
                                  </Label>
                          <Input
                            className="form-control-alternative"
                            name="account"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={banks.account}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <Label className="form-control-Label">
                            Dígito da Conta
                                  </Label>
                          <Input
                            className="form-control-alternative .inputNumber"
                            name="accountDigit"
                            type="text"
                            innerRef={register({ required: true })}
                            defaultValue={banks.accountDigit}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">

                        <FormGroup>
                          <Label
                            className="form-control-Label"
                          >
                            Tipo da conta
                                  </Label>
                          <Input
                            className="form-control-alternative"
                            name="accountType"
                            type="select"
                            innerRef={register({ required: true })}
                            defaultValue={banks.accountType}
                          >
                            <option value="C"  >Conta Corrente</option>
                            <option value="P" >Conta Poupança</option>
                          </Input>
                        </FormGroup>

                      </Col>

                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Plano</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Label>Plano selecionado</Label>
                      <Input
                        type="select"
                        name="planId"
                        id="exampleSelect"
                        defaultValue={client.planId}
                        innerRef={register({ required: true })}
                      >
                        {plans.map(plan => (
                          <option value={plan.id} key={plan.id}>{plan.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </div>

                  <Col className='d-flex justify-content-center'>
                    <Button color="primary" className='self-align-center' >
                      Confirmar
                    </Button>
                  </Col>
                </Form>
                  
                )}

              
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
