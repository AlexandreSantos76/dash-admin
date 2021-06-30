
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Badge,
  Label,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { useUsers } from '../../hooks/users';
import { usePlans } from '../../hooks/plans'
import { useForm } from "react-hook-form"
import { useGateway } from "../../hooks/getnet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'


// core components
import Header from "components/Headers/Header";

function ClientProfile() {
  const { register, handleSubmit, errors } = useForm();
  const { getSelectedUserId, updateUser, getUser, updateStatus } = useUsers();
  const { getPlans, getPlanGateway } = usePlans();
  const [isCpf, setIsCpf] = useState(false);
  const [client, setClient] = useState({});
  const [address, setAddress] = useState({});
  const [banks, setBanks] = useState({})
  const [plans, setPlans] = useState([]);
  const [getnetPlans, setGetnetPlans] = useState([])
  const [getnetStatus, setGetnetStatus] = useState("")
  const [clientStatus, setClientStatus] = useState("")
  const gateway = useGateway();
  const { id } = useParams();
  useEffect(() => {
    async function loadingData() {
      const response = await getUser(id);
      let user = response.data
      const responsePlans = await getPlans();
      const gPlans = await getPlanGateway()
      setGetnetPlans(gPlans)
      user.subsellerId = user.subseller.subsellerId
      setClient(user);
      setAddress(user.addresses[0])
      setBanks(user.bankAccounts[0])
      setPlans(responsePlans);
      setGetnetStatus(user.subseller.status)
      setClientStatus(user.status)
      user.type === "pf" ? setIsCpf(true) : setIsCpf(false)
    }
    loadingData();
  }, [getSelectedUserId, id, getUser, getPlans, getPlanGateway])

  const handleCallback = async () => {

    let { status, data } = await gateway.callback(client.id);
    if (status) {

    }
  };

  const onSubmit = (data) => {
    let { legalName, tradeName, document, stateFiscalDocument, phone, mobile, email, planId, street, number, neighborhood, city, state, zipCode, complement, bankCode, agency, accountNumber, accountType, accountDigit } = data
    let userData = { id: id, legalName, tradeName, document, stateFiscalDocument, phone, mobile, email, planId, type: isCpf ? "pf" : "pj" }

    let addresses = { id: address.id, name: "Bussines Address", street: street, number, neighborhood, city, state, zipCode, complement }

    let bankAccounts = { id: banks.id, bankCode, agency, accountNumber, accountType, accountDigit }
    userData.mobile = userData.mobile.replace(/\D/g, "")
    userData.document = client.document
    userData.stateFiscalDocument = client.stateFiscalDocument
    userData.phone = userData.phone.replace(/\D/g, "")
    addresses.zipCode = addresses.zipCode.replace(/\D/g, "")
    let dataSubmit = {
      user: userData,
      mailingAddressEquals: "S",
      address: addresses,
      bankAccounts: bankAccounts,
      subsellerId: client.subsellerId
    }
    updateUser(dataSubmit)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/admin/">Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to="/admin/clients">Clientes</Link></BreadcrumbItem>
              <BreadcrumbItem active>Cliente:{client.id} Subseller: {client.subsellerId}</BreadcrumbItem>
            </Breadcrumb>
            <Card className="bg-secondary shadow">

              <CardBody>
                {client && (
                  <div className="pl-lg-4">
                    <Row className="mb-2">
                      <Col>
                        <h6 className="heading-small text-muted mb-4">
                          Status do Cliente
                        </h6>
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label className="form-control-Label" for="">Status Geral</Label>
                              <Input
                                className="form-control-alternative"
                                name="status"
                                id="input-status"
                                type="select"
                                value={clientStatus}
                                onChange={e => { updateStatus(client.id, { status: e.target.value }); setClientStatus(e.target.value) }}
                              >
                                <option value="active" >Ativo</option>
                                <option value="pending">Pendente</option>
                                <option value="blocked">Bloqueado</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col>

                            <Label className="form-control-Label" for="">Status Getnet</Label><br />
                            <div className="de-flex mt-1 ">
                              <Badge color={getnetStatus === "Aprovado Transacionar"
                                ? "success"
                                : "Em Análise" || "Trativa de Cadastro" ? "warning" : "danger"
                              }
                                pill>{getnetStatus}</Badge>
                              <Button className="ml-4" color="primary">Verificar</Button>
                            </div>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label className="form-control-Label" for="">Prazo para Recebimento</Label>
                              <Input
                                className="form-control-alternative"
                                name="gatwayPlan"
                                id="input-name"
                                type="select"
                              >
                                {getnetPlans.map((plan, key) =>
                                  <option key={key} value={plan.paymentplan_id}>{plan.name}</option>
                                )}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr className="my-4" />
                      </Col>
                    </Row>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col lg="4">
                          <h6 className="heading-small text-muted mb-4">
                            Informações
                          </h6>
                          <FormGroup>
                            <Label className="form-control-Label" for="">Razão Social/Nome</Label>
                            <Input
                              className="form-control-alternative"
                              name="legalName"
                              id="input-name"
                              type="text"
                              placeholder="Razão Social"
                              innerRef={register({ required: true })}
                              defaultValue={client.legalName}
                            />
                          </FormGroup>
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
                          <FormGroup>
                            <Label className="form-control-Label" for="input-cpf">CNPJ/CPF</Label>
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
                          {!isCpf &&
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
                                type="text"
                                disabled
                                defaultValue={client.stateFiscalDocument}
                              />
                            </FormGroup>
                          }
                          <FormGroup>
                            <Label className="form-control-Label" for="">Email</Label>
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
                          <FormGroup>
                            <Label className="form-control-Label" for="">Telefone Fixo</Label>
                            <Input
                              className="form-control-alternative"
                              id="input-mobile"
                              name="mobile"
                              type="text"
                              placeholder="Telefone Comercial"
                              innerRef={register({ required: true })}
                              defaultValue={client.mobile}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="form-control-Label" for="">Celular</Label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              name="phone"
                              type="text"
                              placeholder="Celular"
                              innerRef={register({ required: false })}
                              defaultValue={client.phone}
                            />
                          </FormGroup>
                          {isCpf && (
                            <>
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
                              <FormGroup>
                                <Label className="form-control-Label" for="input-birthday">
                                  Data de nascimento
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-birthday"
                                  name="birthdate"
                                  type="date"
                                  innerRef={register({ required: true })}
                                  defaultValue={client.birthdate}
                                />
                              </FormGroup>
                            </>
                          )
                          }
                        </Col>
                        <Col lg="4">
                          {/* Address */}
                          <h6 className="heading-small text-muted mb-4">
                            Endereço
                          </h6>
                          <FormGroup>
                            <Label
                              className="form-control-Label"
                              for="input-address"
                            >
                              Endereço
                            </Label>
                            <Input
                              className="form-control-alternative"
                              name="street"
                              id="input-address"
                              type="text"
                              innerRef={register({ required: true })}
                              defaultValue={address.street}
                            />
                          </FormGroup>
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
                          <FormGroup>
                            <Label
                              className="form-control-Label"
                              for="input-zipCode"
                            >
                              CEP
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-zipCode"
                              name="zipCode"
                              type="text"
                              innerRef={register({ required: true })}
                              defaultValue={address.zipCode}
                            />
                          </FormGroup>

                        </Col>
                        <Col lg="4">
                          {/* Address */}
                          <h6 className="heading-small text-muted mb-4">
                            Conta bancária
                          </h6>

                          <Row>
                            <Col lg="2" className="pr-1">
                              <FormGroup>
                                <Label
                                  className="form-control-Label"
                                >
                                  Banco
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  placeholder="Banco"
                                  name="bankCode"
                                  type="text"
                                  innerRef={register({ required: true })}
                                  defaultValue={banks.bankCode}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="2" className="pl-1 pr-1">
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
                            <Col lg="3" className="pl-1 pr-1">
                              <FormGroup>
                                <Label
                                  className="form-control-Label"
                                >
                                  Conta
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  name="accountNumber"
                                  type="text"
                                  innerRef={register({ required: true })}
                                  defaultValue={banks.accountNumber}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="2" className="pl-1 pr-1">
                              <FormGroup>
                                <Label className="form-control-Label">
                                  Dígito
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
                            <Col lg="3" className="pl-1">

                              <FormGroup>
                                <Label
                                  className="form-control-Label"
                                >
                                  Tipo
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  name="accountType"
                                  type="select"
                                  innerRef={register({ required: true })}
                                  defaultValue={banks.accountType}
                                >
                                  <option value="C"  >Corrente</option>
                                  <option value="P" >Poupança</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Alert color="info">
                                <FontAwesomeIcon icon={faInfoCircle} color="info" /> <strong>Regras Número da Conta</strong><br />

                                Caixa Econômica Federal - São 3 dígitos para o tipo de conta, 8 dígitos para a conta<br />
                                001 – Conta Corrente de Pessoa Física;<br />
                                003 – Conta Corrente de Pessoa Jurídica;<br />
                                013 – Poupança de Pessoa Física;<br />
                                022 – Poupança de Pessoa Jurídica.<br />
                                Ex: Será necessário colocar o tipo de conta (sem os zeros à esquerda) e o número da conta: 130000123.<br />
                                <br />
                                <FontAwesomeIcon icon={faInfoCircle} color="info" /> <strong>Regras Dígito da Conta</strong><br />
                                <br />
                                Deve conter 1 digito numérico; Caso o dígito da conta seja X, substitua por 0.

                              </Alert>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <hr className="my-4" />
                              <h6 className="heading-small text-muted mb-4">Plano</h6>
                              <div className="">
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

                            </Col>

                            <Col className='d-flex justify-content-center'>
                              <Button color="primary" className='self-align-center btn-block' >
                                Salvar
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </div>

                )}
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ClientProfile;
