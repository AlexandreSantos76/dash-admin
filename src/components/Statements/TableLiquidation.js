import React, { useState, useEffect } from "react";
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
  const [orders, setOrders] = useState([]);
  const [comissions, setComissions] = useState([]);
  const [init, setInit] = useState(moment().clone().startOf("month").format());
  const [end, setEnd] = useState(moment().format());
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    const getSumary = async () => {
      let data = await liquidation({ init: init, end: end });
      let ord = data.orders;
      let arrayResponse = [];
      ord.forEach((order) => {
        let tr = order.transations;
        if (
          tr !== null &&
          typeof tr === "object" &&
          tr.hasOwnProperty("response")
        ) {
          let res = JSON.parse(order?.transations?.response);

          if (res !== null && res.hasOwnProperty("payment_id")) {
            arrayResponse.push(res);
          }
        }
      });
      setResponses(arrayResponse);
      setOrders(data.orders);
      setTransactions(data.transactions.list_transactions);
      setComissions(data.transactions.commission);
    };
    getSumary();
  }, [init, end]);
  const setRange = (e) => {
    setInit(moment(e.start).format());
    setEnd(moment(e.end).format());
  };

  const getOrder = async (payment) => {
    let ordId = await responses.find((o) => o.payment_id === payment);
    let order = await orders.find((o) => o.id === parseInt(ordId.order_id));
    return order;
  };
  //console.log(orders);
  console.log(comissions);
  if (orders.length) {
    getOrder("6065b3a0e17e440011e2581b");
  }
  return (
    <>
      <Row>
        <Col xs="6">
          <DatetimeRangePicker
            className="d-flex"
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
        <Table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Produto</th>
              <th>Valor Total</th>
              <th>MDR</th>
              <th>Comissão</th>
            </tr>
          </thead>
          <tbody>
              {comissions.map((data,key)=>{
                  //let order = getOrder(data.payment_id)
                  return(
                      <tr key={key}>
                          <td>{data.payment_id}</td>
                          <td>{data.item_id}</td>
                          <td>{data.installment_amount}</td>
                          <td>{data.mdr_rate_ammount}</td>
                          <td>{data.subseller_rate_amount}</td>
                      </tr>
                  )
              })}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default TableLiquidations;
