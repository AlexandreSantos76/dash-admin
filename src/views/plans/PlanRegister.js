
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
  Label,
  InputGroup,
  InputGroupAddon,
  Collapse,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { usePlans } from '../../hooks/plans'

import american_express from '../../assets/img/bandeiras/american_express.png';
import dinners_club from '../../assets/img/bandeiras/dinners_club.png';
import cabal from '../../assets/img/bandeiras/cabal.png';
import cred_system from '../../assets/img/bandeiras/cred_system.png';
import credz from '../../assets/img/bandeiras/credz.png';
import hiper from '../../assets/img/bandeiras/hiper.png';
import soro_cred from '../../assets/img/bandeiras/soro_cred.png';
import visa from '../../assets/img/bandeiras/visa.svg';
import hiper_card from '../../assets/img/bandeiras/hiper_card.svg';
import master_card from '../../assets/img/bandeiras/master_card.svg';
import elo from '../../assets/img/bandeiras/elo.svg';

function PlanMonetizPaySettings(){


  const { savePlans } = usePlans();

  const [planName, setPlanName]= useState('');
  const [statusPlan, setStatusPlan] = useState(true);
  
  const [collapse, setCollpase] = useState(false);
  
  const [taxMonetizStatus, setTaxMonetizStatus] = useState(false);
  const [paymentMonetizTaxType, setPaymentMonetizTaxType] = useState('percentage');
  const [taxMonetizValue, setTaxMonetizValue] = useState(0)
  
  const [taxBoletoStatus, setTaxBoletoStatus] = useState(false);
  const [paymentBoletoBuyerTaxType, setPaymentBoletoBuyerTaxType] = useState('percentage');
  const [paymentBoletoBuyerTaxValue, setPaymentBoletoBuyerTaxValue] = useState(0);

  const [paymentBoletoMonetizTaxType, setPaymentBoletoMonetizTaxType] = useState('percentage');
  const [paymentBoletoMonetizTaxValue, setPaymentBoletoMonetizTaxValue] = useState(0);

  const [taxCreditCardStatus, setTaxCreditCardStatus ] = useState(false);
  const [paymentCreditCardBuyerTaxType, setPaymentCreditCardBuyerTaxType] = useState('percentage');
  const [paymentCreditCardBuyerTaxValue, setPaymentCreditCardBuyerTaxValue ] = useState(0);

  const [paymentCreditCardMonetizTaxType, setPaymentCreditCardMonetizTaxType] = useState('percentage');
    const [paymentCreditCardMonetizTaxValue, setPaymentCreditCardMonetizTaxValue ] = useState(0);

  const [installments, setInstallments] = useState([]);
  const [installmentsCreditCardFields, setInstallmentsCreditCardFields] = useState([]);
  const [installmentsCreditCard, setInstallmentsCreditCard] = useState(16);
  const [installmentsCreditCardSelected, setInstallmentsCreditCardSelected] = useState(12);

  const toggle = () => setCollpase(!collapse);

  const [installmentsCreditCardArea, setInstallmentsCreditCardArea] = useState([])
  const [installmentInputsValueMonetiz, setInstallmentInputsValueMonetiz] = useState([])
  const [installmentInputsValueBuyer, setInstallmentInputsValueBuyer] = useState([])
  const [installmentsInputValues, setInstallmentsInputValues] = useState([]);
  const [update, setUpdate ] = useState(false);

  

  const [creditCards, setCreditCards] = useState([
    {
      name: 'American Express',
      img: american_express,
    },
    {
      name: "Dinner's Club",
      img: dinners_club
    },
    {
      name: "Cabal",
      img: cabal
    },
    {
      name: "Cred System",
      img: cred_system
    },
    {
      name: "Credz",
      img: credz
    },
    {
      name: "Hiper",
      img: hiper
    },
    {
      name: "Soro Cred",
      img: soro_cred
    },
    {
      name: "Visa",
      img: visa
    },
    {
      name: "Hiper Card",
      img: hiper_card
    },
    {
      name: "Master Card",
      img: master_card
    },
    {
      name: "Elo",
      img: elo
    },
  ])

  useEffect(() => {
    const auxCreditCard = creditCards.map( creditCard => ({
      ...creditCard,
      installmentsMonetiz: new Array( installmentsCreditCard).fill(0),
      installmentsBuyer: new Array(installmentsCreditCard).fill(0)
    }))

    setInstallmentsInputValues(auxCreditCard);
  }, [creditCards, installmentsCreditCard, installmentsCreditCard.length])

  useEffect(() => {
    const auxInstallments = [];
    for(let i = 1; i <= installmentsCreditCard; i++){
      auxInstallments.push(i);
    }
    setInstallments(auxInstallments);

  }, [creditCards, installmentsCreditCard])

  useEffect(() => {
    const auxInstallments = [];
    for(let i = 1; i <= installmentsCreditCardSelected; i++){
      auxInstallments.push(i);
    }

    setInstallmentsCreditCardFields(auxInstallments);

  }, [installmentsCreditCard, installmentsCreditCardSelected])

  useEffect(() => {
    const length = creditCards.length;

    const auxInstallmentsCreditCardArea = [];

    for(let i = 0; i < length; i ++){
      auxInstallmentsCreditCardArea.push(false);
    }

    setUpdate( state => !state)

  },[creditCards])

  const handleInstallmentsArea = useCallback((index) => {
    console.log(index);
    const auxInstallmentsCreditCardArea = installmentsCreditCardArea;
    auxInstallmentsCreditCardArea[index] = !auxInstallmentsCreditCardArea[index];

    setInstallmentsCreditCardArea(auxInstallmentsCreditCardArea);

    console.log(auxInstallmentsCreditCardArea)
    setUpdate(state => !state);
  }, [installmentsCreditCardArea])

  const handleValueInputBuyer = useCallback((value, creditCard,index) => {

    const auxInstallmentsInputValues = installmentsInputValues;

    const installmentsInputValueIndex = auxInstallmentsInputValues.findIndex( item => item.name === creditCard);
    auxInstallmentsInputValues[installmentsInputValueIndex].installmentsBuyer[index] = value;

    setInstallmentsInputValues(auxInstallmentsInputValues);
    
    setUpdate(state => !state)
  }, [installmentsInputValues])


  const handleValueInputMonetiz = useCallback((value, creditCard,index) => {
    const auxInstallmentsInputValues = installmentsInputValues;

    const installmentsInputValueIndex = auxInstallmentsInputValues.findIndex( item => item.name === creditCard);
    auxInstallmentsInputValues[installmentsInputValueIndex].installmentsMonetiz[index] = Number(value);

    setInstallmentsInputValues(auxInstallmentsInputValues);

    
    setUpdate(state => !state)
  }, [installmentsInputValues])


  const handleResumeInstallment = useCallback((creditCard,index) => {
    const auxInstallmentsInputValues = installmentsInputValues;

    const installmentsInputValueIndex = auxInstallmentsInputValues.findIndex( item => item.name === creditCard);

    return `
      ${auxInstallmentsInputValues[installmentsInputValueIndex].installmentsBuyer[index]/100}% 
    + ${auxInstallmentsInputValues[installmentsInputValueIndex].installmentsMonetiz[index]/100}% 
    = ${auxInstallmentsInputValues[installmentsInputValueIndex].installmentsBuyer[index]/100 
      + auxInstallmentsInputValues[installmentsInputValueIndex].installmentsMonetiz[index]/100}%
    `

  },[installmentsInputValues]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const data = {
      name: planName,
      status: statusPlan,
      monetiz_tax_status: taxMonetizStatus,
      monetiz_tax_method: paymentBoletoBuyerTaxType,
      monetiz_tax: paymentBoletoBuyerTaxValue,
      boleto_tax_status: taxBoletoStatus,
      boleto_tax_buyer_method: paymentBoletoBuyerTaxType,
      boleto_tax_buyer: paymentBoletoBuyerTaxValue,
      boleto_tax_monetiz_method: paymentBoletoMonetizTaxType,
      boleto_tax_monetiz: paymentBoletoMonetizTaxValue,
      credit_card_tax_status: taxCreditCardStatus,
      credit_card_tax_buyer_method: paymentCreditCardBuyerTaxType,
      credit_card_tax_buyer: paymentCreditCardBuyerTaxValue,
      credit_card_tax_monetiz_method: paymentCreditCardMonetizTaxType,
      credit_card_tax_monetiz: paymentCreditCardMonetizTaxValue,
    }

    await savePlans(data);

    console.log(data);
  };
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
                    <h3 className="mb-0">Cadastro</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => handleSubmit(e)} id='form'>
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
                            Nome
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={(e) => setPlanName(e.target.value)}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                      <FormGroup className='d-flex flex-column'>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Status
                          </label>
                          <FormGroup className='d-flex flex-column'>
                            <Label onClick={() => setStatusPlan(true)}>
                              <Input type='radio' name='statusPlan' checked={statusPlan}/>
                                Ativo
                            </Label>

                            <Label onClick={() => setStatusPlan(false)}>
                              <Input type='radio' name='statusPlan' checked={!statusPlan}/>
                                Inativo
                            </Label>

                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                  <h6 className="heading-small text-muted mb-4">
                    Taxas
                  </h6>
                    <Row>
                      <Col lg="6">
                        <FormGroup className='d-flex flex-column'>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Monetiz
                          </label>
                          <FormGroup className='d-flex flex-column'>
                            <Label onClick={() => setTaxMonetizStatus(true)}>
                              <Input type='radio' name='taxMonetizStatus' checked={taxMonetizStatus}/>
                                Ativo
                            </Label>

                            <Label onClick={() => setTaxMonetizStatus(false)}>
                              <Input type='radio' name='taxMonetizStatus' checked={!taxMonetizStatus}/>
                                Inativo
                            </Label>

                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Collapse isOpen={taxMonetizStatus}>
                      <Row>
                        <Col lg="6">
                          <FormGroup className='d-flex flex-column'>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Tipo de taxa Monetiz
                            </label>
                            <FormGroup className='d-flex flex-column'>
                              <Label onClick={() => setPaymentMonetizTaxType('percentage')}>
                                <Input type='radio' name='paymentMonetizTaxType' checked={ paymentMonetizTaxType === 'percentage'}/>
                                  Porcentagem (%)
                              </Label>

                              <Label onClick={() => setPaymentMonetizTaxType('fixed')}>
                                <Input type='radio' name='paymentMonetizTaxType' checked={ paymentMonetizTaxType === 'fixed'}/>
                                  Fixa (R$)
                              </Label>

                            </FormGroup>
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Valor
                            </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">{paymentMonetizTaxType === 'percentage' ? '%' : 'R$'}</InputGroupAddon>
                              <Input placeholder="Valor" min={0} max={100} type="text" step="1" onChange={(e) => setTaxMonetizValue(e.target.value)}/>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Collapse>



                    <Row>
                      <Col lg="6">
                        <FormGroup className='d-flex flex-column'>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Boleto
                          </label>
                          <FormGroup className='d-flex flex-column'>
                            <Label onClick={() => setTaxBoletoStatus(true)}>
                              <Input type='radio' name='taxBoletoStatus' checked={taxBoletoStatus}/>
                                Ativo
                            </Label>

                            <Label onClick={() => setTaxBoletoStatus(false)}>
                              <Input type='radio' name='taxBoletoStatus' checked={!taxBoletoStatus}/>
                                Inativo
                            </Label>

                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Collapse isOpen={taxBoletoStatus}>
                      <Row>
                        <Col lg="6">
                          <FormGroup className='d-flex flex-column'>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Tipo de taxa no Boleto (Adquirente)
                            </label>
                            <FormGroup className='d-flex flex-column'>
                              <Label onClick={() => setPaymentBoletoBuyerTaxType('percentage')}>
                                <Input type='radio' name='paymentBoletoBuyerTaxType' checked={ paymentBoletoBuyerTaxType === 'percentage'}/>
                                  Porcentagem (%)
                              </Label>

                              <Label onClick={() => setPaymentBoletoBuyerTaxType('fixed')}>
                                <Input type='radio' name='paymentBoletoBuyerTaxType' checked={ paymentBoletoBuyerTaxType === 'fixed'}/>
                                  Fixa (R$)
                              </Label>

                            </FormGroup>
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Valor
                            </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">{paymentBoletoBuyerTaxType === 'percentage' ? '%' : 'R$'}</InputGroupAddon>
                              <Input placeholder="Valor" min={0} max={100} type="text" step="1" onChange={(e) => setPaymentBoletoBuyerTaxValue(e.target.value)} />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup className='d-flex flex-column'>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Tipo de taxa no Boleto (Monetiz)
                            </label>
                            <FormGroup className='d-flex flex-column'>
                              <Label onClick={() => setPaymentBoletoMonetizTaxType('percentage')}>
                                <Input type='radio' name='paymentBoletoMonetizTaxType' checked={ paymentBoletoMonetizTaxType === 'percentage'}/>
                                  Porcentagem (%)
                              </Label>

                              <Label onClick={() => setPaymentBoletoMonetizTaxType('fixed')}>
                                <Input type='radio' name='paymentBoletoMonetizTaxType' checked={ paymentBoletoMonetizTaxType === 'fixed'}/>
                                  Fixa (R$)
                              </Label>

                            </FormGroup>
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Valor
                            </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">{paymentBoletoMonetizTaxType === 'percentage' ? '%' : 'R$'}</InputGroupAddon>
                              <Input placeholder="Valor" min={0} max={100} type="text" step="1" onChange={(e) => setPaymentBoletoMonetizTaxValue(e.target.value)}/>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Collapse>

                    <Row>
                      <Col lg="6">
                        <FormGroup className='d-flex flex-column'>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Cartão de Crédito
                          </label>
                          <FormGroup className='d-flex flex-column'>
                            <Label onClick={() => setTaxCreditCardStatus(true)}>
                              <Input type='radio' name='taxCreditCard' checked={taxCreditCardStatus}/>
                                Ativo
                            </Label>

                            <Label onClick={() => setTaxCreditCardStatus(false)}>
                              <Input type='radio' name='taxCreditCard' checked={!taxCreditCardStatus}/>
                                Inativo
                            </Label>

                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Collapse isOpen={taxCreditCardStatus}>
                      <Row>
                        <Col lg="6">
                          <FormGroup className='d-flex flex-column'>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Tipo de taxa no Cartão de Crédito à vista (Adquirente)
                            </label>
                            <FormGroup className='d-flex flex-column'>
                              <Label onClick={() => setPaymentCreditCardBuyerTaxType('percentage')}>
                                <Input type='radio' name='paymentCreditCardBuyerTaxType' checked={ paymentCreditCardBuyerTaxType === 'percentage'}/>
                                  Porcentagem (%)
                              </Label>

                              <Label onClick={() => setPaymentCreditCardBuyerTaxType('fixed')}>
                                <Input type='radio' name='paymentCreditCardBuyerTaxType' checked={ paymentCreditCardBuyerTaxType === 'fixed'}/>
                                  Fixa (R$)
                              </Label>

                            </FormGroup>
                          </FormGroup>
                        </Col>
                        


                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Valor
                            </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">{paymentCreditCardBuyerTaxType === 'percentage' ? '%' : 'R$'}</InputGroupAddon>
                              <Input placeholder="Valor" min={0} max={100} type="text" step="1" onChange={(e) => setPaymentCreditCardBuyerTaxValue(e.target.value)}/>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup className='d-flex flex-column'>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Tipo de taxa no Cartão de Crédito à vista (Monetiz)
                            </label>
                            <FormGroup className='d-flex flex-column'>
                              <Label onClick={() => setPaymentCreditCardMonetizTaxType('percentage')}>
                                <Input type='radio' name='paymentCreditCardMonetizTaxType' checked={ paymentCreditCardMonetizTaxType === 'percentage'}/>
                                  Porcentagem (%)
                              </Label>

                              <Label onClick={() => setPaymentCreditCardMonetizTaxType('fixed')}>
                                <Input type='radio' name='paymentCreditCardMonetizTaxType' checked={ paymentCreditCardMonetizTaxType === 'fixed'}/>
                                  Fixa (R$)
                              </Label>

                            </FormGroup>
                          </FormGroup>
                        </Col>
                        

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Valor
                            </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">{paymentCreditCardMonetizTaxType === 'percentage' ? '%' : 'R$'}</InputGroupAddon>
                              <Input placeholder="Valor" min={0} max={100} type="text" step="1" onChange={(e) => setPaymentCreditCardMonetizTaxValue(e.target.value)}/>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup className='d-flex flex-column'>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Cartão de Crédito
                            </label>

                            <FormGroup>
                              <Label for="exampleSelect">Número de parcelas limite</Label>
                              <Input type="select" name="select" id="exampleSelect" onChange={(e) => setInstallmentsCreditCardSelected(e.target.value)}>
                                {
                                  installments.map(item => (
                                    <option key={item} value={item} selected>{item}</option>
                                  ))
                                }
                              </Input>
                            </FormGroup>

                          </FormGroup>
                        </Col>

                      </Row>


                    </Collapse>

                  {
                    taxCreditCardStatus && creditCards.map((creditCard, index) => (
                      <>
                        <Row>
                          <Col lg='4' style={{margin:'5px 0'}}>
                            <Button 
                              color = 'primary'
                              className='mb-2'
                              onClick={() => handleInstallmentsArea(index)}
                              style={{width: '300px', display: 'flex', alignItems: 'center'}}
                              
                            >
                              <img style={{width: '50px'}} src={creditCard.img}/>

                              {creditCard.name}
                            </Button>
                          </Col>
                        </Row>

                        <Collapse isOpen={installmentsCreditCardArea[index]}>
        
                            <Col lg='12' >
                              {installmentsCreditCardFields.map((item, index) => (
                                <>
                                <Col className='d-flex align-items-center' style={{margin: 0}}>
                                <Col lg='6'>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-last-name"
                                    >
                                    {`${item} Parcela (ADQUIRENTE)`}
                                    </label>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                                      <Input placeholder="Valor" type="text" placeholder='0,00' onChange={(e) => handleValueInputBuyer(e.target.value, creditCard.name, index)}/>
                                    </InputGroup>
                                  </FormGroup>
                                </Col>

                                  <Col lg='6'>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-last-name"
                                    >
                                    {`${item} Parcela (MONETIZ)`}
                                    </label>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                                      <Input placeholder="Valor" type="text" placeholder='0' onChange={(e) => handleValueInputMonetiz(e.target.value, creditCard.name ,index)}/>
                                    </InputGroup>
                                  </FormGroup>
                                  </Col>
                                </Col>
                                    <Row style={{marginTop: '-20px', display:'flex', justifyContent: 'center'}}>
                                       <small style={{marginBottom: '20px'}}>{`Resumo: ${handleResumeInstallment(creditCard.name, index)}`}</small>
                                    </Row>
                                </>
                              ))} 
                  
                          </Col>
                        </Collapse>
                      </>
                    ))
                  }
                    
                  </div>

                 

                  <Col className='d-flex justify-content-center'>
                    <Button color="primary" className='self-align-center' type='submit' form='form'>
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
export default PlanMonetizPaySettings;
