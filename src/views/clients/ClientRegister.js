
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
  Col
} from "reactstrap";
// core components

import { usePlans } from '../../hooks/plans';
import { useGetnet } from '../../hooks/getnet';
import { useUsers } from '../../hooks/users';

import UserHeader from "components/Headers/UserHeader.js";



function ClientRegister(){

  const { getPlans } = usePlans();
  const { cpfSituation, handlePreRegisterCpf, handlePreRegisterCnpj } = useGetnet();
  const {  userRegister } = useUsers();

  const [isCpf, setIsCpf] = useState(true);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail ] = useState('');
  const [cpf, setCpf] = useState('');
  const [occupation, setOccupation ] = useState('');
  const [motherName, setMotherName] = useState('');
  const [motherSurname, setMotherSurname] = useState('')

  const [businessStreet, setBusinessStreet] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [businessCEP, setBusinessCEP] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity]= useState('');
  const [state, setState ] = useState('');
  const [cep, setCep] = useState('');

  const [plan, setPlan ] = useState('')
  const [plans, setPlans] = useState([]);

  const [cnpj, setCnpj] = useState('');
  const [legalName, setLegalName ] = useState('');
  const [tradeName, setTradeName ] = useState('');
  const [stateFiscalNumber, setStateFiscalNumber ] = useState('');




  const [bankAccounts, setBankAccounts] = useState([{
    bank_code: '',
    agency: '',
    account: '',
    account_type: ''
  }]);

  const [test, setTest] = useState(false)

  useEffect(() => {
    async function loadingPlan(){
      const response = await getPlans();

      setPlans(response);
    };

    loadingPlan();

  },[getPlans]);
  
  useEffect(() => {
    async function verifyCpfValidate(){
      if(cpf.length === 11){
        await cpfSituation(cpf);
      };
    }
    verifyCpfValidate()
  },[cpf, cpfSituation])

  const handleBankAccount = useCallback((index, field, value) => {
    const stateUpdated = bankAccounts;
    stateUpdated[index] = {
      ...bankAccounts[index],
      [field]: value,
    }

    setBankAccounts(stateUpdated)
    console.log(stateUpdated)
    setTest(state => !state)
  },[bankAccounts])

  const handleAddBankAccount = useCallback((e) => {
    e.preventDefault();

    const bankAccountsUpdated = [
      ...bankAccounts,
     {
      bank_code: '',
      agency: '',
      account: '',
      account_type: ''
     }
    ]

    setBankAccounts(bankAccountsUpdated)

    setTest(state => !state)
  },[bankAccounts]);

  const handleRemoveBankAccount = useCallback((e, index) => {

    e.preventDefault();

    if(bankAccounts.length - 1 < 1){
      return
    }

    const bankAccountsUpdated = bankAccounts;

    bankAccountsUpdated.splice(index, 1);

    setBankAccounts(bankAccountsUpdated);
    setTest(state => !state)


  },[bankAccounts]);



  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const client = await userRegister({
      name,
      email,
      password: 'senha123',
      passwordConfirm: 'senha123',
      cpf: `${isCpf ? cpf: cnpj}`,
      plan_id: plan,
    })
    

    if(isCpf){
      handlePreRegisterCpf({  
        cpf,
        name,
        surname,
        birthdate,
        motherName,
        motherSurname,
        businessAddress: {
          street: businessStreet,
          // number: businessNumber,
          // neighborhood: businessNeighborhood,
          city: businessCity,
          state: businessState,
          cep: businessCEP,
        },
        mailingAddress: {
          street,
          // number,
          // neighborhood,
          city,
          state,
          cep
        },
        email,
        bankAccounts, 
        user_id: client.id
      })
    } else {
      handlePreRegisterCnpj({  
        cnpj,
        name,
        surname,
        tradeName,
        legalName,
        stateFiscalNumber,
        businessAddress: {
          street: businessStreet,
          // number: businessNumber,
          // neighborhood: businessNeighborhood,
          city: businessCity,
          state: businessState,
          cep: businessCEP,
        },
        mailingAddress: {
          street,
          // number,
          // neighborhood,
          city,
          state,
          cep
        },
        email,
        bankAccounts, 
        user_id: client.id
      });
    }
  },[bankAccounts, birthdate, businessCEP, businessCity, businessState, businessStreet, cep, city, cnpj, cpf, email, handlePreRegisterCnpj, handlePreRegisterCpf, isCpf, legalName, motherName, motherSurname, name, plan, state, stateFiscalNumber, street, surname, tradeName, userRegister])

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

                <Row>
                  <Col>
                    <label>Tipo de conta</label>
                    <Row>
                    <div class="custom-control custom-radio mb-3">
                        <input type="radio" id="typeCPF" name="accountType" class="custom-control-input" value={isCpf} onChange={() => setIsCpf(true)}/>
                        <label class="custom-control-label" for="typeCPF">CPF</label>
                      </div>
                      <div class="custom-control custom-radio" style={{marginLeft: '15px'}}>
                        <input type="radio" id="typeCNPJ" name="accountType" class="custom-control-input" value={!isCpf} onChange={() => setIsCpf(false)}/>
                        <label class="custom-control-label" for="typeCNPJ">CNPJ</label>
                      </div>
                    </Row>
                  </Col>
                </Row>
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
                            htmlFor="input-first-name"
                          >
                            Nome
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="input-first-name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Sobrenome
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={surname}
                            id="input-last-name"
                            onChange={e => setSurname(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Data de nascimento
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
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
                            placeholder="exemplo@monetiz.com.br"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
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
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                CPF
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={cpf}
                                id="input-cpf"
                                onChange={e => setCpf(e.target.value)}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>

                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Ocupação/Profissão
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-occupation"
                                value={occupation}
                                onChange={e => setOccupation(e.target.value)}                        
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Nome da mãe
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={motherName}
                                onChange={e => setMotherName(e.target.value)}
                                id="input-username"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>

                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Sobrenome da mãe
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                value={motherSurname}
                                onChange={e => setMotherSurname(e.target.value)}
                                type="text"
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
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                CNPJ
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={cnpj}
                                id="input-cnpj"
                                onChange={e => setCnpj(e.target.value)}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>

                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Inscrição estadual
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-state-fiscal"
                                value={stateFiscalNumber}
                                onChange={e => setStateFiscalNumber(e.target.value)}                        
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Razão social
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={legalName}
                                onChange={e => setLegalName(e.target.value)}
                                id="input-username"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>

                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Nome fantasia
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                value={tradeName}
                                onChange={e => setTradeName(e.target.value)}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        </>
                      )
                    }

                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Endereço Comercial
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
                            value={businessStreet}
                            onChange={e => setBusinessStreet(e.target.value)}
                            id="input-address"
                            type="text"
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
                            Bairro
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={setBusinessCity}
                            onChange={e => setBusinessCity(e.target.value)}
                            id="input-city"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Número
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={businessState}
                            onChange={e => setBusinessState(e.target.value)}
                            id="input-country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Complemento
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            value={businessCEP}
                            onChange={e => setBusinessCEP(e.target.value)}
                            type="text"
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
                            value={setBusinessCity}
                            onChange={e => setBusinessCity(e.target.value)}
                            id="input-city"
                            type="text"
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
                            value={businessState}
                            onChange={e => setBusinessState(e.target.value)}
                            id="input-country"
                            type="text"
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
                            value={businessCEP}
                            onChange={e => setBusinessCEP(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Endereço de correspondência
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
                            value={street}
                            onChange={e => setState(e.target.value)}
                            id="input-address"
                            type="text"
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
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            id="input-city"
                            type="text"
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
                            value={state}
                            onChange={e => setState(e.target.value)}
                            id="input-country"
                            type="text"
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
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Contas bancárias</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                        <label>Contas bancárias</label>
                        <Button 
                          color='primary'
                          onClick={(e) => handleAddBankAccount(e)} 
                        >
                            Adicionar outra conta
                        </Button>
                      </Row>
                       {
                         bankAccounts.map((ba, index) => (
                           <div>
                             <Row className='d-flex align-items-center'>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-city"
                                  >
                                    Código do banco
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-city"
                                    placeholder="City"
                                    type="text"
                                    value={ba.bank_code}
                                    onChange={(e) => handleBankAccount(index, 'bank_code', e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="3">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-country"
                                  >
                                    Agência
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-country"
                                    type="text"
                                    value={ba.agency}
                                    onChange={(e) => handleBankAccount(index, 'agency', e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-country"
                                  >
                                    Número da conta
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-postal-code"
                                    value={ba.account}
                                    onChange={(e) => handleBankAccount(index, 'account', e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="3">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-country"
                                  >
                                    Tipo da conta
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-postal-code"
                                    value={ba.account_type}
                                    onChange={(e) => handleBankAccount(index, 'account_type', e.target.value)}
                                  />
                                </FormGroup>
                              
                              </Col>
                              <Col lg='2' style={{justifySelf:'flex-end'}}> 
                                <Button 
                                  color='danger' 
                                  outline
                                  onClick={(e) => handleRemoveBankAccount(e, index)}
                                  >Excluir
                                </Button>
                              </Col>
                            </Row>
                           </div>
                         ))
                       }
                    </FormGroup>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Plano</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Plano selecionado</label>
                        <Input 
                          type="select" 
                          name="select" 
                          id="exampleSelect"
                          onChange={e => setPlan(e.target.value)}
                        >
                         {plans.map(plan => (
                           <option value={plan.id} key={plan.id}>{plan.name}</option>
                         ))}
                        </Input>
                    </FormGroup>
                  </div>

                  <Col className='d-flex justify-content-center'>
                    <Button color="primary" className='self-align-center' onClick={(e) => handleSubmit(e)}>
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
