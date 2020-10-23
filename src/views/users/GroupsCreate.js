import React, { useEffect, useState } from 'react'
import Header from "components/Headers/Header.js";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, CustomInput, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import api from 'services/api';
import { Checkbox } from 'utils/Checkbox';
import { arrayOf } from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';


function GroupsCreate() {
    const [resources, setResources] = useState([])
    const [select, setSelect] = useState([])
    const [allChecked, setAllChecked] = useState(false)
    const [group, setGroup] = useState("")
    const history = useHistory()

    useEffect(() => {
        let fetchResources = async () => {
            api.get("/admin/resource")
                .then(result => {
                    let data = result.data
                    data.map(item => {
                        setSelect(oldArray => [...oldArray, { id: item.id, isChecked: false }])
                    })
                    setResources(result.data)
                })
        }
        fetchResources()

    }, [])
    
    const handleSubmit = (e)=>{
        e.preventDefault()
       let data = {group:group, resources:select}
       api.post("/admin/groups",data)
       .then(data=>{
           console.log(data.data.id);
           history.push(`user-group-update/${data.data.id}`)
       })
    }

    const handleAllChecked = (event) => {
        let allChecked = false
        let array = select.map(item => {
            return { ...item, isChecked: event.target.checked }
        })
        setAllChecked(event.target.checked)
        setSelect(select => array)
    }

    const handleCheckChieldElement = (event) => {

        let array = select.map(item => {
            if (item.id === parseInt(event.target.value)) {
                console.log(`item: ${item.id}`);
                return { ...item, isChecked: event.target.checked }
            }

            return item
        })
        let slt = array.filter(obj => { return obj.isChecked === true })
        if (slt.length === select.length) {
            setAllChecked(true)
        } else {
            setAllChecked(false)
        }
        setSelect(array)
    }

    return (
        <>
            <Header />
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
                                                <h3 className="mb-0">Grupos</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col sm="4">
                                                        <h2>Grupos</h2>
                                                        <p>
                                                            Crie grupos de trabalho e gerencie as permissões de acesso de cada grupo.
                                                        </p>
                                                    </Col>
                                                    <Col sm="8">
                                                        <Card className="shadow">
                                                            <Form onSubmit={handleSubmit}>
                                                                <CardBody>

                                                                    <FormGroup className="border-bottom-1">
                                                                        <Label>Nome<span className="text-red">*</span></Label>
                                                                        <Input name="name" id="name" type="text" required={true}  onChange={e=>setGroup(e.target.value)}/>
                                                                    </FormGroup>

                                                                    <div className="custom-control custom-checkbox mb-3">
                                                                        <input
                                                                            className="custom-control-input"
                                                                            id="checkAll"
                                                                            name="checkAll"
                                                                            type="checkbox"
                                                                            checked={allChecked}
                                                                            onChange={handleAllChecked}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor="checkAll">
                                                                            Este grupo terá permissão total
                                                                        </label>
                                                                    </div>

                                                                    <ul style={{ listStyleType: "none" }}>
                                                                        {resources?.map(item => {
                                                                            let slt = select.filter(obj => { return obj.id === item.id })
                                                                            let checked = slt[0].isChecked ? "checked" : ""
                                                                            return (
                                                                                <li key={item.id}>
                                                                                    <div className="custom-control custom-checkbox mb-3">
                                                                                        <input
                                                                                            className="custom-control-input"
                                                                                            id={item.alias}
                                                                                            name={item.name}
                                                                                            type="checkbox"
                                                                                            checked={checked}
                                                                                            onChange={handleCheckChieldElement}
                                                                                            label={item.name}
                                                                                            value={item.id}
                                                                                        />
                                                                                        <label className="custom-control-label" htmlFor={item.alias}>
                                                                                            {item.name}
                                                                                        </label>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        })}
                                                                    </ul>

                                                                </CardBody>
                                                                <CardFooter>
                                                                <Button  type="reset">Cancelar</Button>
                                                                    <Button color="primary" type="submit">Salvar</Button>
                                                                </CardFooter>
                                                            </Form>

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
    )
}
export default GroupsCreate