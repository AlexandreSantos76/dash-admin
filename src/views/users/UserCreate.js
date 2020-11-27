import React, { useEffect, useState } from 'react'
import Header from "components/Headers/Header.js";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import api from 'services/api';
import {useForm} from "react-hook-form"
import { useHistory } from 'react-router-dom'


const UserCreate = () => {
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();
    const [groups, setGroups] = useState()
    useEffect(() => {
        let fetchGroups = async () => {
            await api.get("/admin/groups")
                .then(result => {
                    let data = result.data
                    setGroups(data)
                })
        }
        fetchGroups()
    }, [])

    const onSubmit = async data => {
        await api.post("/admin/user",data)
        .then((result) => {
            console.log(result);
            
        }).catch((err) => {
            console.log(err);
        });
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
                                                <h3 className="mb-0">Usuários</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col sm="4">
                                                        <h2>Grupos</h2>
                                                        <p>
                                                            Gerencie os usuários ativos
                                                            e vincule-os em grupos de
                                                            trabalho.
                                                        </p>
                                                    </Col>
                                                    <Col sm="8">
                                                        <Card className="shadow">
                                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                                <CardBody>                                                                
                                                                    <FormGroup>
                                                                        <Label>Email<span className="text-red">*</span></Label>
                                                                        <Input type="email" name="email" innerRef={register({ required: true })} />                                                                        
                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Label>Grupo<span className="text-red">*</span></Label>
                                                                        <Input type="select" name="groupid" innerRef={register({ required: true })} >
                                                                            {groups?.map(group => {
                                                                                return(<option key={group.id} value={group.id}>{group.name}</option>)
                                                                            })}
                                                                        </Input>                                                                        
                                                                    </FormGroup>
                                                                </CardBody>
                                                                <CardFooter>
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
export default UserCreate