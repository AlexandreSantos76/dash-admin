
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

} from "reactstrap";

import { format, parseISO } from 'date-fns';
import { formatPrice } from '../../utils/format';

import { useChargebacks } from '../../hooks/chargebacks';
// core components
import UserHeader from "components/Headers/Header";
import api from "services/api";

function ChargebackSettings(){

  const {getSelectedChargeback  } = useChargebacks();


  const [client, setClient] = useState({});
  const [chargeback, setChargeback] = useState({});

  const [plans, setPlans] = useState([]);
  const [planSelected, setPlanSelected] = useState(null);
  const chargeback_id = getSelectedChargeback();



  useEffect(() => {
    async function loadingData(){
      const response = await api.get(`/chargebacks/show/${chargeback_id}`);


    
      setClient(response.data.user);
      setChargeback(response.data);
    }
    loadingData();
  },[chargeback_id])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // const data = {
    //   id:client.id,
    //   name,
    //   email,
    //   cpf,
    //   celular,
    //   status,
    //   plan_id: planSelected
    // }
    // updateUser(data)
  },[])

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
                    <h3 className="mb-0">Chargeback</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {client && (
                  <Form onSubmit={(e) => handleSubmit(e)} id="form">
                  <h6 className="heading-small text-muted mb-4">
                    Informações do cliente
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Cliente
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            value={client.name}
                            type="text"
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <h6 className="heading-small text-muted mb-4">
                    Informações do Chargeback
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Valor
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            value={formatPrice(chargeback.value)}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Status
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            value={chargeback.status ? "Pago" : "Inadimplente"}
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    { chargeback && chargeback.createdAt && (
                      <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Data requerido
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            value={format(parseISO(chargeback.createdAt), 'dd/MM/yyyy')}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Data limite
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            value={format(parseISO(chargeback.due_date), 'dd/MM/yyyy')}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    )}
                  </div>

                
                </Form>
                )}

              <Col className='d-flex justify-content-center'>
                    {
                      client.status 
                      ? (                    
                        <Button color="warning" outline className='self-align-center' type='submit' form='form'>
                          Bloquear Conta
                        </Button>
                      )
                      : (                    
                        <Button color="success" outline className='self-align-center' type='submit' form='form'>
                          Desbloquear Conta
                        </Button>
                      )
                    }
              </Col>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ChargebackSettings;
