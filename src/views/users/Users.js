import React, { useEffect, useState, useCallback } from 'react'
import Header from "components/Headers/Header.js";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import api from 'services/api';

function Users() {
    const [selectGroup, setSelectGroup] = useState([])
    const [deleteGroup, setDeleteGroup] = useState(false)
    const [groups, setGroups] = useState([])
    const [delectedGroup, setDeletedG] = useState(false)

    const [selectUser, setSelectUser] = useState([])
    const [deleteUser, setDeleteUser] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (selectGroup.length > 0) {
            setDeleteGroup(true)
        } else {
            setDeleteGroup(false)
        }
    }, [selectGroup])
    useEffect(() => {
        let fetchGroups = async () => {
            await api.get("/admin/groups")
                .then(result => {
                    let data = result.data
                    console.log(data);
                    setGroups(data)
                })
        }
        let fetchUsers = async () => {
            await api.get("/admin/users")
                .then(result => {
                    let data = result.data

                    setUsers(result.data)
                })
        }
        fetchGroups()
        fetchUsers()

    }, [delectedGroup])
    const buttonEditGroup = (cell, row) => {
        return (
            <Link to={`user-group-update/${cell}`} className="btn btn-sm btn-primary" color="primary" >Editar</Link>
        )
    }
    const collGroup = useCallback((id) => {
        console.log(id);
        let label = groups?.find(gr => gr.id === id)
        return (
            label.name
        )
    }, [groups])
    const columnsGroups = [
        {
            dataField: 'name',
            text: 'Nome'
        },
        {
            dataField: 'id',
            text: '',
            formatter: buttonEditGroup
        }];
    const columnsUsers = [
        {
            dataField: 'id',
            text: 'Id',
            hidden: true
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: 'groupId',
            text: 'Grupo',
            //formatter: (cell, row) =>collGroup(cell)
        },
        {
            dataField: 'action',
            text: ''
        }];

    const selectRowGroups = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#fefce7',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setSelectGroup(old => [...old, row.id])
            } else {
                setSelectGroup(selectGroup.filter(item => item !== row.id))
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map(row => {
                    setSelectGroup(old => [...old, row.id])
                })
            } else {
                setSelectGroup([])
            }
        },
    };
    const selectRowUsers = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#fefce7',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setSelectUser(old => [...old, row.id])
            } else {
                setSelectUser(selectUser.filter(item => item !== row.id))
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map(row => {
                    setSelectUser(old => [...old, row.id])
                })
            } else {
                setSelectUser([])
            }
        },
    };

    const onDeleteGroups = (e) => {
        e.preventDefault()
        api.delete('/admin/group', { data: selectGroup })
            .then((result) => {
                let data = result.data
                setDeletedG(false)
                setSelectGroup(old => [])
                setDeleteGroup(false)

            }).catch((err) => {


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
                                                            Crie grupos de trabalho e gerencie as permissões de acesso de cada grupo.
                                                        </p>
                                                    </Col>
                                                    <Col sm="8">
                                                        <Card className="shadow">
                                                            <CardHeader className="border-0 d-flex align-items-center justify-content-between" >
                                                                <p>Você tem {groups.length} grupos</p>
                                                                <Link to="user-group" className="btn btn-primary btn-sm">+Novo grupo</Link>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <BootstrapTable
                                                                    keyField='id'
                                                                    data={[...groups]}
                                                                    columns={columnsGroups}
                                                                    selectRow={selectRowGroups}
                                                                    bootstrap4={true}
                                                                    bordered={false}
                                                                />
                                                            </CardBody>
                                                            <CardFooter>
                                                                <div><Button color="danger" size="sm" disabled={!deleteGroup} onClick={e => onDeleteGroups(e)}> Excluir Selecionados</Button></div>
                                                            </CardFooter>
                                                        </Card>
                                                        <Card className="shadow mt-3">
                                                            <CardHeader className="border-0 d-flex align-items-center justify-content-between" >
                                                                <p>Você tem {users.length} usuários</p>
                                                                <Link to="user-create" className="btn btn-primary btn-sm">+Novo Usuário</Link>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <BootstrapTable
                                                                    keyField='id'
                                                                    data={users}
                                                                    columns={columnsUsers}
                                                                    selectRow={selectRowUsers}
                                                                    bootstrap4={true}
                                                                    bordered={false}
                                                                />
                                                            </CardBody>
                                                            <CardFooter>
                                                                <div><Button color="danger" size="sm" disabled={!deleteUser} > Excluir Selecionados</Button></div>
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
        </>
    )
}
export default Users