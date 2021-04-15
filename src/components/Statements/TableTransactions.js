import React, { useState, useEffect } from 'react'
import 'fontsource-roboto';
import MUIDataTable, { ExpandButton } from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from 'reactstrap/lib/Table';
import moment from 'moment'
import 'moment/locale/pt-br'
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { formatCNPJ } from 'utils/FormateUtils';
import { formatCurrency } from 'utils/FormateUtils';
import api from 'services/api';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { formatCPF } from 'utils/FormateUtils';

const TableTranctions = (props) => {
    const [summary, setSummary] = useState()
    const [single, setSingle] = useState()
    const [modal, setModal] = useState(false);
    useEffect(() => {
        function getSumary() {
            let data = props.transactions
            let orders = props.orders
            let arraySum = []
            data?.forEach((value) => {
                let sum = value.summary
                sum.details = value.details
                arraySum.push(sum)
            })
            setSummary(arraySum)
        }
        getSumary()
    }, [props])
    const toggle = () => setModal(!modal);
    const getDetails = async (order) => {
        const result = summary.find(t => t.order_id === order)
        const details = result.details
        //console.log(result)
        api.get(`/getnet/find-transaction/${result.order_id}`)
            .then((res) => {
                setSingle({
                    gn: result,
                    dt: details,
                    bd: res.data
                })
                toggle()
            }).catch((err) => {

            });
    }



    const TransactionsType = ["Crédito à vista", "Crédito Parcelado", "Crédito Parcelamento Administradora", "Débito,", "Cancelamento", "Chargeback", "Boleto"]
    const TransactionsStatus = [{ id: 0, status: "Aprovado" }, { id: 70, status: "Aguardando" }, { id: 77, status: "Pendente" }, { id: 78, status: "Pendente de Pagamento" }, { id: 83, status: "Timeout" },
    { id: 90, status: "Inexistente" }, { id: 91, status: "Negado Administradora" }, { id: 92, status: "Estornada" }, { id: 93, status: "Repetida" }, { id: 94, status: "Estornada Conciliação" }, { id: 98, status: "Cancelada - Sem Confirmação" }, { id: 99, status: "Negado - MGM" },]

    const getMuiTheme = () => createMuiTheme({
        shadows: Array(25).fill('none'),
        overrides: {
            MUIDataTableSelectCell: {
                expandDisabled: {
                    // Soft hide the button.
                    visibility: 'hidden',
                },
            },
            MUIDataTableBodyRow: {
                root: {
                    '&:nth-child(odd)': {
                        backgroundColor: '#f6f8fa'
                    }
                }
            },
            MUIDataTableBodyCell: {
                root: {
                    padding: "5px"
                },
            },
            MUIDataTableHeadRow: {
                root: {
                    backgroundColor: "#FF0000",
                }
            },
            MUIDataTableHeadCell: {
                fixedHeader: {
                    backgroundColor: "#FF0000",
                    padding: "5px"
                },
                data: {
                    color: "#ffffff",
                    fontWeight: "bold"
                }
            }
        }
    })
    const options = {
        filter: true,
        filterType: "dropdown",
        pagination: true,
        rowsPerPage: 20,
        download: true,
        print: true,
        sort: true,
        search: true,
        viewColumns: false,
        selectableRows: "none",
        textLabels: {
            body: {
                noMatch: "Nenhum registro encontrado"
            }
        },
        expandableRows: true,
        expandableRowsHeader: false,
        expandableRowsOnClick: true,
        isRowExpandable: (dataIndex, expandedRows) => {
            if (dataIndex === 3 || dataIndex === 4) return false;
            if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
            return true;
        },
        renderExpandableRow: (rowData, rowMeta) => {
            const colSpan = rowData.length + 1;
            return (
                <TableRow>
                    <TableCell colSpan={colSpan} className="text-right " >
                       
                            <Table style={{width:"400px", float:"right"}} >
                                <tbody>
                                    <tr><td><strong>Taxa Getnet:</strong></td><td>{formatCurrency(0)}</td></tr>
                                    <tr><td><strong>Comissão</strong></td><td>{formatCurrency(0)}</td></tr>
                                    <tr><td><strong>Juros</strong></td><td>{formatCurrency(0)}</td></tr>
                                </tbody>
                            </Table>
                    </TableCell>
                </TableRow>
            );
        },
        onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => console.log(curExpanded, allExpanded, rowsExpanded),
    }
    const dataCols = [

        {
            label: "Pedido",
            name: "order_id",
            options: {
                filter: false,
            }
        },        
        {
            label: "Subseller",
            name: "marketplace_subsellerid",
            options: {
                filter: true,
            }
        },
        {
            label: "Tipo de Transação",
            name: "transaction_type",
            options: {
                filter: true,
                customBodyRender: (value) => (<>{TransactionsType[value - 1]}</>)
            }
        },
        {
            label: "Valor",
            name: "card_payment_amount",
            options: {
                filter: false,
                customBodyRender: (value) => (<>{formatCurrency(value / 100)}</>)
            }
        },
        {
            label: "Status",
            name: "transaction_status_code",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    let status = TransactionsStatus.find(i => i.id === value)
                    return (<>{status.status}</>)
                }
            }
        },
        {
            label: "Data da Transação",
            name: "transaction_date",
            options: {
                filter: true,
                customBodyRender: (value) => {

                    return (<>{moment(value).format("DD/MM/YY HH:MM:SS")}</>)
                }
            }
        },
        {
            label: "Ver",
            name: "order_id",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <Button size="sm" color="primary" onClick={() => getDetails(value)} >
                        Detalhes
                    </Button >
                )
            }
        },

    ]
    const components = {
        ExpandButton: function (props) {
            if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{ width: '24px' }} />;
            return <ExpandButton {...props} />;
        }
    };

    return (
        <>
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Transações do período"}
                    data={summary}
                    columns={dataCols}
                    options={options}
                    components={components}
                />
            </MuiThemeProvider>
            <Modal size={"lg"} isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode="X">Detalhes da Transação</ModalHeader>
                <ModalBody>
                    {single &&
                        <div className="transaction">
                            <Row>
                                <Col xs="2">Subseller:</Col>
                                <Col xs="4"><strong>{single?.gn.marketplace_subsellerid}</strong></Col>
                                <Col xs="2">CNPJ/CPF:</Col>
                                <Col><strong>{formatCNPJ(single?.bd.orders.shop.user.document)}</strong></Col>
                            </Row>
                            <Row>
                                <Col xs="2">Cliente:</Col>
                                <Col><strong>{single?.bd.orders.shop.user.legalName}</strong></Col>
                            </Row>
                            <hr className="m-1" />
                            <Row>
                                <Col xs="2">Comprador:</Col>
                                <Col xs="4"><strong>{single?.bd.orders.customer.name}</strong></Col>
                                <Col xs="2">CPF:</Col>
                                <Col><strong>{formatCPF(single?.bd.orders.customer.document)}</strong></Col>
                            </Row>
                            
                            <hr className="m-1"/>
                        </div>}
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="secondary" onClick={toggle}>Fechar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default TableTranctions