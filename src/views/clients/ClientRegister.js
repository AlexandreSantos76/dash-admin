
import React, { useState, useCallback, useEffect } from "react";

// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Label } from "reactstrap";
// core components

import { usePlans } from '../../hooks/plans';

import UserHeader from "components/Headers/UserHeader.js";
import { cpf as validaCpf, cnpj as validaCnpj } from 'cpf-cnpj-validator';
import { useForm } from "react-hook-form"
import {userRegister} from "hooks/users"


function ClientRegister() {

  const { getPlans } = usePlans();
  const { register, handleSubmit, watch, errors } = useForm();

  const [isCpf, setIsCpf] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadingPlan() {
      const response = await getPlans();

      setPlans(response);
    };

    loadingPlan();

  }, [getPlans]);

  const onSubmit = async data => {
    console.log(data)
    let { legalName, tradeName, document, stateFiscalDocument, phone, mobile, email, address, number, neighborhood, city, state, postcode, complement, codeBank, agency, account, accountType, accountDigit } = data
    let userData = { legalName, tradeName, document, stateFiscalDocument, phone, mobile, email }
    let addresses = { name: "Bussines Address", address, number, neighborhood, city, state, postcode, complement }
    let bankAccounts = {
      type_accounts: "unique",
      unique_account: { codeBank, agency, account, accountType, accountDigit }
    }
    let dataSubmit = {
      user: userData,
      mailingAddressEquals: "S",
      addresses: [address],
      bankAccounts: bankAccounts,
      accepted_contract: "S",
      liability_chargeback: "S",
      marketplace_store: "N",
      payment_plan: 3
    }
    //result = userRegister(dataSubmit)
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
                <h6 className="heading-small text-muted mb-4">Tipo de conta</h6>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>

                      <Row>
                        <Col className="mb-3 ">
                          <div className="d-flex pl-lg-4">
                            <div className="custom-control custom-radio mb-3">
                              <Input className="" type="radio" name="type" onChange={() => setIsCpf(true)} value="pf" />
                              <Label className="custom-control-Label" for="typeCPF">CPF</Label>
                            </div>
                            <div className="custom-control custom-radio" style={{ marginLeft: '15px' }}>
                              <Input className="c" type="radio" name="type" defaultChecked onChange={() => setIsCpf(false)} value="pj" />
                              <Label className="custom-control-Label" for="typeCNPJ">CNPJ</Label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

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
                                  innerRef={register({ required: true })}
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
                                  innerRef={register({ required: true })}
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
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Conta bancária</h6>
                  <div className="pl-lg-4">
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
                          >
                            <option value="C" >Conta Corrente</option>
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
                        name="plainId"
                        id="exampleSelect"
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ClientRegister;
