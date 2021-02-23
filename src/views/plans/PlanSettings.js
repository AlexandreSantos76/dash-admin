
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, CardFooter, Table, Modal, ModalHeader, ModalBody, ModalFooter, Label, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { toast } from 'react-toastify'
// core components
import UserHeader from "components/Headers/Header";
import Editable from "components/Plans/EditTable"
import { usePlans } from '../../hooks/plans'
import { formatCurrency, formatPercentage } from '../../utils/FormateUtils';
import boleto from '../../assets/img/bandeiras/boleto.svg'
import american_express from '../../assets/img/bandeiras/american_express.svg';
import visa from '../../assets/img/bandeiras/visa.svg';
import hiper_card from '../../assets/img/bandeiras/hiper_card.svg';
import master_card from '../../assets/img/bandeiras/master_card.svg';
import elo from '../../assets/img/bandeiras/elo.svg';
import api from "services/api";

function PlanSettings() {
  const { register, handleSubmit } = useForm()
  const { register: register2, handleSubmit: handleSubmitComissions } = useForm();
  const { getPlan, handleGetPlanDetailsId, updatePlan, deletePlan } = usePlans();
  const plan_id = handleGetPlanDetailsId();
  const [plan, setPlan] = useState({})
  const [comissions, setComissions] = useState([])
  const [modal, setModal] = useState(false);
  const [brands] = useState([
    { brand: `Boleto`, img: boleto, },
    { brand: `Visa`, img: visa, },
    { brand: `Mastercard`, img: master_card, },
    { brand: `Amex`, img: american_express, },
    { brand: `Elo`, img: elo, },
    { brand: `Hipercard`, img: hiper_card, },
  ]);
  const [inst] = useState([
    { value: "BOLETO", label: "Boleto" },
    { value: "CREDITO A VISTA", label: "Crédito a Vista" },
    { value: "PARCELADO LOJISTA 3X", label: "Parcelado Lojista 3x" },
    { value: "PARCELADO LOJISTA 6X", label: "Parcelado Lojista 6x" },
    { value: "PARCELADO LOJISTA 9X", label: "Parcelado Lojista 9x" },
    { value: "PARCELADO LOJISTA 12X", label: "Parcelado Lojista 12x" },
    { value: "PARCELADO EMISSOR", label: "Parcelado Emissor" },
  ])
  const inputRef = useRef();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const loadingData = async () => {
      let response = await getPlan(plan_id)
      setPlan(response)
      setComissions(response?.comissions)
    }
    loadingData()
  }, [plan_id, getPlan])


  const handleDelete = async (e) => {
    await deletePlan(plan_id)
  }

  const plainSubmit = async (data) => {
    await updatePlan(data)
  }

  const comissionSubmit = async (data) => {
    let dataSubmit = data
    let value = data.value
    value = value.replace(/\D/g, "")
    dataSubmit.planId = plan_id
    dataSubmit.status = true
    dataSubmit.value = parseInt(value)
    try {
      const response = await api.post("/plans/comissions", dataSubmit)
      setComissions(oldArray => [...oldArray, response.data])
      toggle()
      toast.success("Comissões atualizado !");
    } catch (err) {
      console.log(err);
      toast.error("Tente novamente !");
    }
  }

  const updateComission = async (data, id, index) => {
    let value = data
    value = value.replace(/\D/g, "")
    try {

      await api.put("/plans/comissions", {id:id,value:value})
      let newArr = [...comissions];
      newArr[index].value = value;
      console.log(newArr);
      setComissions(newArr)
    } catch (err) {
      console.log(err);
    }
  }

  const deleteComission = async (id) => {
    api.delete(`/plans/comissions/${id}`)
    let array = await comissions.filter(el => el.id !== id)
    setComissions(array)


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
                      <CardHeader className="border-0 d-flex align-items-center justify-content-between" >
                        <h3 className="mb-0">Planos</h3>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col sm="3">
                            <h2>Planos</h2>
                            <p>
                              Gerencie os planos ativos
                              e defina comissões e planos personalizados.
                            </p>
                          </Col>
                          <Col sm="9">
                            <Card className="bg-secondary shadow">
                              <CardHeader className="bg-white border-0">
                                <Row className="align-items-center justify-content-between">
                                  <Col xs="8">
                                    <h3 className="mb-0">{plan?.name}</h3>
                                  </Col>
                                  <Button color='danger' outline type='button' onClick={handleDelete}> Deletar</Button>
                                </Row>
                              </CardHeader>
                              <CardBody>
                                <Form onSubmit={handleSubmit(plainSubmit)} id='form'>
                                  <Input type="hidden" name="id" value={plan_id} innerRef={register} />
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
                                          defaultValue={plan?.name}
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
                                            <Input name="status" defaultChecked={plan?.status} type="checkbox" innerRef={register} />
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
                                        <Input type="select" name="type" innerRef={register} value={plan?.type} onChange={e => { setPlan({ ...plan, type: e.target.value }) }}>
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

                            <Card className="bg-secondary shadow mt-3">
                              <CardHeader className="bg-white border-0" >
                                <Row className="align-items-center justify-content-between">
                                  <Col xs="8">
                                    <h3 className="mb-0">Comissões e Taxas</h3>
                                  </Col>
                                  <Button color='danger' outline type='button' onClick={toggle}> Adicionar</Button>
                                </Row>

                              </CardHeader>
                              <CardBody>
                                <Table className="align-items-center" >
                                  <thead className="thead-light">
                                    <tr>
                                      <th></th>
                                      <th>Nome</th>
                                      <th>Tipo</th>
                                      <th>Valor</th>
                                      <th>Ações</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {comissions?.map((value, key) => {
                                      let brand = brands.filter(o => o.brand === value.brand)
                                      return (
                                        <tr key={value.id}>
                                          <td><img src={brand[0]?.img} alt={brand[0]?.brand} style={{ maxWidth: "30px" }} /></td>
                                          <td>{value.name}</td>
                                          <td className="text-center">{value.type === "percentage" ? "%" : "R$"}</td>
                                          <td>
                                            <Editable
                                              text={value.type === "percentage" ? formatPercentage(value.value / 100) : formatCurrency(value.value)}
                                              placeholder="Write a task name"
                                              childRef={inputRef}
                                              type="input"
                                            >
                                              <input
                                                ref={inputRef}
                                                type="text"
                                                name="task"
                                                placeholder="Write a task name"
                                                defaultValue={value.type === "percentage" ? formatPercentage(value.value / 100) : formatCurrency(value.value)}
                                                onBlur={e => updateComission(e.target.value, value.id, key)}
                                              />
                                            </Editable>
                                            
                                          </td>
                                          <td>
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
                                                <DropdownItem href="#pablo">
                                                  <Button size="sm" color="danger" onClick={e => { e.preventDefault(); deleteComission(value.id) }}>Deletar</Button>
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </UncontrolledDropdown>
                                          </td>
                                        </tr>
                                      )
                                    }
                                    )}
                                  </tbody>
                                </Table>
                              </CardBody>
                              <CardFooter>
                              </CardFooter>
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
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle} >Taxa e Comissão</ModalHeader>
        <Form onSubmit={handleSubmitComissions(comissionSubmit)}>
          <ModalBody>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Bandeira</Label>
                  <Input type="select" name="brand" innerRef={register2} >
                    {brands.map((value, index) => (<option key={index}>{value.brand}</option>))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Nome</Label>
                  <Input type="select" name="name" innerRef={register2}>
                    {inst.map((value, key) => (<option key={key} value={value.value}>{value.label}</option>))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Tipo de Taxa</Label>
                  <Input type="select" name="type" innerRef={register2} >
                    <option value="percentage">Porcentagem</option>
                    <option value="fixed">Valor Fixo</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Valor</Label>
                  <Input type="text" name="value" innerRef={register2} />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" type="submit">Salvar</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
export default PlanSettings;