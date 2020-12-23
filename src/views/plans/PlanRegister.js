
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, CardFooter, Table, Modal, ModalHeader, ModalBody, ModalFooter, Label, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

// core components
import UserHeader from "components/Headers/Header";
import { usePlans } from '../../hooks/plans'


function PlanMonetizPaySettings(){

  const { register, handleSubmit } = useForm()
  const { savePlans } = usePlans();
 
  

  
  const plainSubmit = async (data) => {
    console.log(data);
    await savePlans(data)
  }


  
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardBody>
                <Row className="justify-content-center">
                  <Col xs="12" md="9">
                    <Card className="border-0">
                     
                      <CardBody>
                        <Row>
                          <Col sm="3">
                            <h2>Planos</h2>
                            <p>
                              Cadastre planos,
                              defina comissões e planos personalizados.
                            </p>
                          </Col>
                          <Col sm="9">
                            <Card className="bg-secondary shadow">                              
                              <CardBody>
                                <Form onSubmit={handleSubmit(plainSubmit)} id='form'>
                                  <Row>
                                    <Col>
                                      <h6 className="heading-small text-muted mb-4">Informações</h6>
                                      <FormGroup>
                                        <label className="form-control-label" htmlFor="input-name">
                                          Nome
                                          </label>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-name"
                                          type="text"
                                          name="name"
                                          innerRef={register}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="6">
                                      <label className="form-control-label">
                                        Status
                                      </label>
                                      <div className="d-flex mt-3">

                                        <FormGroup>
                                          <label className="custom-toggle">
                                            <Input name="status" type="checkbox" innerRef={register} />
                                            <span className="custom-toggle-slider rounded-circle" />
                                          </label>
                                        </FormGroup>
                                        <span className="pl-1">Ativar Plano</span>
                                      </div>
                                    </Col>
                                    <Col md="6">
                                      <label className="form-control-label">
                                        Tipo
                                        </label>
                                      <FormGroup>
                                        <Input type="select" name="type" innerRef={register} >
                                          <option value="PUBLIC">Público</option>
                                          <option value="EXCLUSIVE">Personalizado</option>
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className='d-flex justify-content-center'>
                                      <Button color="primary" className='self-align-center' type='submit' form='form'>
                                        Confirmar
                                      </Button>
                                    </Col>
                                  </Row>
                                </Form>
                              </CardBody>
                            </Card>                            
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default PlanMonetizPaySettings;
