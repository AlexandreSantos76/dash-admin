import React, { useState, useEffect } from 'react'
import 'fontsource-roboto';
import MUIDataTable, { ExpandButton } from 'mui-datatables'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from 'reactstrap/lib/Table';
import moment from 'moment'
import 'moment/locale/pt-br'

const TableTranctions = (props) => {
    const [summary, setSummary] = useState()
    useEffect(() => {
        function getSumary() {
            let data = props.transactions
            let array = []
            data.forEach((value) => {
                console.log(value);
                array.push(value.summary)
            })
            console.log(array);
            setSummary(array)
        }
        getSumary()
    }, [props])
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
        expandableRows: false,
        expandableRowsHeader: false,
        expandableRowsOnClick: false,
        isRowExpandable: (dataIndex, expandedRows) => {
            if (dataIndex === 3 || dataIndex === 4) return false;
            if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
            return true;
        },
        renderExpandableRow: (rowData, rowMeta) => {
            const colSpan = rowData.length + 1;
            return (
                <TableRow>
                    <TableCell colSpan={colSpan}>
                        Para utilizar este domínio no seu checkout, adicione o registro DNS abaixo no serviço em que você registrou o seu domínio
                    <div style={{ backgroundColor: "#e7fee8", borderLeftColor: "#07ab0e", borderLeftWidth: "3px" }}>
                            <Table>
                                <tbody>
                                    <tr><td><strong>TIPO:</strong></td><td>CNAME</td></tr>
                                    <tr><td><strong>NOME:</strong></td><td>seguro</td></tr>
                                    <tr><td><strong>DESTINO:</strong></td><td>cname.vercel-dns.com</td></tr>
                                </tbody>
                            </Table>
                        </div>
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
            label: "Tipo de Transação",
            name: "transaction_type",
            options: {
                filter: true,
                customBodyRender: (value) => (<>{TransactionsType[value - 1]}</>)
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
            label: "Valor",
            name: "card_payment_amount",
            options: {
                filter: false,
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
                    data={summary}
                    columns={dataCols}
                    options={options}
                    components={components}
                />
            </MuiThemeProvider>
        </>
    )
}

export default TableTranctions