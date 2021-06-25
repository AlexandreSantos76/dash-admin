
import React, { useState, useEffect } from "react";


// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Label, Alert } from "reactstrap";
// core components

import { usePlans } from '../../hooks/plans';
import { useUsers } from '../../hooks/users';

import UserHeader from "components/Headers/Header";
import { cpf as validaCpf, cnpj as validaCnpj } from 'cpf-cnpj-validator';
import { useForm } from "react-hook-form"
import bancos from "bancos-brasileiros"
import { cnpjMask, cepMask, phoneMask } from "utils/masks"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { set } from "date-fns";

const schemaPersonData = Yup.object().shape({
  legalName: Yup.string().required("Nome é um campo obrigatório.").min(8),
  email: Yup.string().email("Exemplo: exemplo@monetiz.com.br").required("E-mail é um campo obrigatório."),
  document: Yup.string().test('Valida Documento', 'Documento Inválido', value => {
    let v = value.replace(/\D/g, "")
    if (v.length === 11) {
      return validaCpf.isValid(value)
    } else if (v.length === 14) {
      return validaCnpj.isValid(value)
    }
    else {
      return false
    }
  }),
  mobile: Yup.string().min(11, "Digite no formato (99)99999-9999").required("Telefone é um campo obrigatório."),
  zipCode: Yup.string().min(8, "Digite no formato 55555555 ou 55555-555")
    .required("CEP é um campo obrigatório."),
  street: Yup.string().required("Rua é um campo obrigatório."),
  number: Yup.string().required("Número é um campo obrigatório."),
  neighborhood: Yup.string().required("Bairro é um campo obrigatório."),
  agency: Yup.string().matches(/^[0-9]*$/, "Digite somente números").required("Agência é um campo obrigatório."),
  accountNumber: Yup.string().matches(/^[0-9]*$/, "Digite somente números").required("Conta é um campo obrigatório."),
  accountDigit: Yup.string().matches(/^[0-9]*$/, "Digite somente números").required("Dígito da conta é um campo obrigatório.").max(1, "Digito inválido")
});
function ClientRegister() {
  const { userRegister } = useUsers();
  const { getPlans } = usePlans();
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schemaPersonData) });
  const [zipCode, setPostcode] = useState('')
  const [viaCep, setViaCep] = useState({ cep: "", state: "", city: "", neighborhood: "", street: "" })
  const [isCpf, setIsCpf] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadingPlan() {
      const response = await getPlans();

      setPlans(response);
    };

    loadingPlan();

  }, [getPlans]);

  const onSubmit = async (data, e) => {
    let { legalName, tradeName, document, stateFiscalDocument, phone, mobile, email, planId, street, number, neighborhood, city, state, zipCode, complement, bankCode, agency, accountNumber, accountType, accountDigit } = data
    let userData = { legalName, tradeName, document, stateFiscalDocument, phone, mobile, email, type: isCpf ? "pf" : "pj", planId }
    let address = { name: "Bussines Address", street, number, neighborhood, city, state, zipCode, complement }
    let bankAccount = {
      bankCode, agency, accountNumber, accountType, accountDigit
    }
    userData.mobile = userData.mobile.replace(/\D/g, "")
    userData.document = userData.document.replace(/\D/g, "")
    userData.stateFiscalDocument = userData.stateFiscalDocument.replace(/\D/g, "")
    userData.phone = userData.phone.replace(/\D/g, "")
    address.zipCode = address.zipCode.replace(/\D/g, "")
    let dataSubmit = {
      user: userData,
      mailingAddressEquals: "S",
      address: address,
      bankAccount: bankAccount,
      accepted_contract: "S",
      liability_chargeback: "S",
      marketplace_store: "N",
      payment_plan: 3
    }

    let res = await userRegister(dataSubmit)
    if (res) {
      e.target.reset();
    }

  }
  useEffect(() => {
    let str = zipCode.replace(/[^\d]+/g, '')
    if (str.length >= 8) {
      fetch(`https://brasilapi.com.br/api/cep/v1/${zipCode}`)
        .then(async response => {
          let rs = await response.json();
          if (response.ok) {
            setViaCep(rs)
          }
        })
    }
  }, [zipCode])
  console.log(errors);
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

                            name="legalName"
                            id="input-name"
                            type="text"
                            invalid={errors.legalName ? true : false}
                            innerRef={register({ required: true })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-Label" for='input-email'>Email</Label>
                          <Input

                            id="input-email"
                            placeholder="exemplo@monetiz.com.br"
                            name="email"
                            type="email"
                            invalid={errors.email ? true : false}
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

                            id="input-mobile"
                            name="mobile"
                            type="text"
                            onChange={e => {
                              const { value } = e.target
                              e.target.value = phoneMask(value)
                            }}
                            invalid={errors.mobile ? true : false}
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
                            id="input-phone"
                            name="phone"
                            onChange={e => {
                              const { value } = e.target
                              e.target.value = phoneMask(value)
                            }}
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
                                  id="input-cpf"
                                  name="document"
                                  type="text"
                                  onChange={e => {
                                    const { value } = e.target
                                    e.target.value = cepMask(value)
                                  }}
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

                                  name="document"
                                  id="input-cnpj"
                                  type="text"
                                  onChange={e => {
                                    const { value } = e.target
                                    e.target.value = cnpjMask(value)
                                  }}
                                  invalid={errors.document ? true : false}
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
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-zipCode"
                          >
                            CEP
                          </Label>
                          <Input
                            id="input-zipCode"
                            name="zipCode"
                            onChange={e => {
                              const { value } = e.target
                              setPostcode(value)
                              e.target.value = cepMask(value)
                            }}
                            type="text"
                            invalid={errors.zipCode ? true : false}
                            innerRef={register({ required: true })}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="8">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                            for="input-address"
                          >
                            Endereço
                          </Label>
                          <Input
                            invalid={errors.street ? true : false}
                            name="street"
                            id="input-address"
                            type="text"
                            defaultValue={viaCep.street}
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
                            invalid={errors.number ? true : false}
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
                            invalid={errors.neighborhood ? true : false}
                            name="neighborhood"
                            id="input-neighborhood"
                            type="text"
                            defaultValue={viaCep.neighborhood}
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

                            name="city"
                            id="input-city"
                            type="text"
                            defaultValue={viaCep.city}
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

                            name="state"
                            id="input-state"
                            type="text"
                            defaultValue={viaCep.state}
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
                      <Col>
                        <Alert color="warning">
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

                      <Col lg="3">
                        <FormGroup>
                          <Label
                            className="form-control-Label"
                          >
                            Código do banco
                          </Label>
                          <Input

                            placeholder="Banco"
                            name="bankCode"
                            type="select"
                            innerRef={register({ required: true })}
                          >
                            {bancos.map(bank => {
                              return (<option value={bank.Code} key={bank.Code}>{`${bank.Code} - ${bank.Name}`}</option>)
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <Label className="form-control-Label">
                            Agência
                          </Label>
                          <Input
                            invalid={errors.agency ? true : false}
                            name="agency"
                            type="text"
                            innerRef={register({ required: true })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <Label className="form-control-Label">
                            Número da conta
                          </Label>
                          <Input
                            invalid={errors.accountNumber ? true : false}
                            name="accountNumber"
                            type="text"
                            innerRef={register({ required: true })}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="1">
                        <FormGroup>
                          <Label className="form-control-Label">
                            <span href="#" id="infoDigit" className="text-info">
                              Dígito
                            </span>

                          </Label>
                          <Input
                            invalid={errors.accountDigit ? true : false}
                            name="accountDigit"
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
                            Tipo da conta
                          </Label>
                          <Input
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
                        name="planId"
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
