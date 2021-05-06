import React, { useState, useEffect, useMemo } from "react";
import "fontsource-roboto";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import moment from "moment";
import "moment/locale/pt-br";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Table,
} from "reactstrap";
import { formatCNPJ } from "utils/FormateUtils";
import { formatCurrency } from "utils/FormateUtils";
import api from "services/api";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import { formatCPF } from "utils/FormateUtils";
import { liquidation } from "../../hooks/billings";
import DatetimeRangePicker from "react-datetime-range-picker";
const TableLiquidations = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [orders, setOrders] = useState([]);
  const [comissions, setComissions] = useState([]);
  const [init, setInit] = useState(moment().clone().startOf("month").format());
  const [end, setEnd] = useState(moment().format());
  useEffect(() => {
    const getSumary = async () => {
      let data = await liquidation({ init: init, end: end });
      let dataTransactions = data.transactions.list_transactions;
      let details = [];
      let dataSummary = [];
      dataTransactions.forEach((tr) => {
        dataSummary.push(tr.summary);
        tr.details.forEach((dt) => {
          details.push(dt);
        });
      });

      setOrders(data.orders);
      setTransactions(details);
      setSummary(dataSummary);
      setComissions(data.transactions.commission);
    };
    getSumary();
  }, [init, end]);
  const setRange = (e) => {
    setInit(moment(e.start).format());
    setEnd(moment(e.end).format());
  };

  const getSummary = (tid) => {
    let ord = summary.find((o) => o.marketplace_transaction_id === tid);
    return ord;
  };

  const getOrder = (id) => {
    let order = orders.find((o) => o.id === parseInt(id));
    return order;
  };

  const getDetail = (tid) => {
    let detail = transactions.find((o) => o.marketplace_transaction_id === tid);

    return detail;
  };

  const getTableRows = () => {
    let rows = [];
    comissions.forEach((data, key) => {
      let detail = getDetail(data.marketplace_transaction_id);
      let sum = getSummary(data.marketplace_transaction_id);
      //let order = getOrder(sum.order_id);
      let compare = moment(end);
      let compareNow = moment(data.subseller_rate_confirm_date);
      if (compareNow < compare) {
        let tableRow = {
          order: sum?.order_id,
          item: data.item_id,
          data: data.transaction_date,
          release: detail?.release_status,
          previsao: data.payment_date,
          confirm: data.subseller_rate_confirm_date,
          total: data.installment_amount,
          mdr: data.mdr_rate_ammount,
          comissao: data.subseller_rate_amount,
        };

        rows.push(tableRow);
      }
    });
    return rows;
  };
  const dataCols = [
    {
      label: "Pedido",
      name: "order",
      options: {
        filter: true,
      },
    },
    {
      label: "Produto",
      name: "item",
      options: {
        filter: true,
      },
    },
    {
      label: "Data",
      name: "data",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <>{moment(value).format("DD/MM/YY")}</>;
        },
      },
    },
    {
      label: "Liberado",
      name: "release",
      options: {
        filter: false,
      },
    },

    {
      label: "Previsão",
      name: "previsao",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <>{moment(value).format("DD/MM/YY")}</>;
        },
      },
    },
    {
      label: "Pagamento",
      name: "confirm",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <>{value && moment(value).format("DD/MM/YY")}</>;
        },
      },
    },
    {
      label: "Valor",
      name: "total",
      options: {
        filter: false,
        customBodyRender: (value) => <>{formatCurrency(value / 100)}</>,
      },
    },
    {
      label: "MDR",
      name: "mdr",
      options: {
        filter: false,
        customBodyRender: (value) => <>{formatCurrency(value / 100)}</>,
      },
    },
    {
      label: "Comissão",
      name: "comissao",
      options: {
        filter: false,
        customBodyRender: (value) => <>{formatCurrency(value / 100)}</>,
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    pagination: true,
    rowsPerPage: 50,
    download: true,
    print: true,
    sort: true,
    search: true,
    viewColumns: false,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: "Nenhum registro encontrado",
      },
    },
    sortOrder: {
      name: "order",
      direction: "desc",
    },
  };
  const getMuiTheme = () =>
    createMuiTheme({
      shadows: Array(25).fill("none"),
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
          },
          root: {
            backgroundColor: "#e9e9e9",
            padding: "5px",
          },
          body: {
            border: "1px solid rgba(224, 224, 224, 1)",
          },
        },
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(odd)": {
              backgroundColor: "#f6f8fa",
            },
          },
        },
        MUIDataTableBodyCell: {
          root: {
            padding: "5px",
          },
        },
        MUIDataTableHeadRow: {
          root: {
            backgroundColor: "#FF0000",
          },
        },
        MuiTableSortLabel: {
          root: {
            color: "#ffffff",
            "&:hover": {
              color: "#ffffff",

              "&& $icon": {
                opacity: 1,
                color: "#ffffff",
              },
            },
            "&$active": {
              color: "#ffffff",

              // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
              "&& $icon": {
                opacity: 1,
                color: "#ffffff",
              },
            },
          },
        },
        MUIDataTableHeadCell: {
          sortActive: {
            color: "#ffffff",
          },
          sortAction: {
            color: "#ffffff",
          },
          fixedHeader: {
            backgroundColor: "#FF0000",
            padding: "5px",
          },
          data: {
            color: "#ffffff",
            fontWeight: "bold",
          },
        },
      },
    });
  const memoExtract = () => {
    let jr = 0;
    let jp = 0;
    let cr = 0;
    let cp = 0;
    comissions.forEach((data, key) => {
      let r = data.subseller_rate_confirm_date ? true : false;
      let compare = moment(end);
      let compareNow = moment(data.subseller_rate_confirm_date);
      if (compareNow < compare) {
        if (data.item_id.match(/tax/)) {
          if (r) {
            jr = jr + data.installment_amount - data.mdr_rate_ammount;
          } else {
            jp = jp + data.installment_amount - data.mdr_rate_ammount;
          }
        } else {
          if (r) {
            cr = cr + data.subseller_rate_amount;
          } else {
            cp = cp + data.subseller_rate_amount;
          }
        }
      }
    });

    return (
      <Table>
        <tbody>
          <tr>
            <td className="text-right">
              <strong>Juros Recebidos:</strong>
            </td>
            <td>{formatCurrency(jr / 100)}</td>
            <td className="text-right">
              <strong>Comissões Recebidas:</strong>
            </td>
            <td>{formatCurrency(cr / 100)}</td>
          </tr>
          <tr>
            <td className="text-right">
              <strong>Juros á Receber:</strong>
            </td>
            <td>{formatCurrency(jp / 100)}</td>
            <td className="text-right">
              <strong>Comissões á Receber:</strong>
            </td>
            <td>{formatCurrency(cp / 100)}</td>
          </tr>
        </tbody>
      </Table>
    );
  };
  return (
    <>
      {transactions && (
        <div>
          <Row className="mb-5">
            <Col>{memoExtract()}</Col>
          </Row>
          <Row>
            <Col xs="6"></Col>
            <Col xs="6">
              <DatetimeRangePicker
                className="d-flex h3"
                inline={true}
                startDate={init}
                endDate={end}
                locale="pt-br"
                pickerClassName="col-6"
                onChange={setRange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Comissões"}
                  data={getTableRows()}
                  columns={dataCols}
                  options={options}
                />
              </MuiThemeProvider>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default TableLiquidations;
