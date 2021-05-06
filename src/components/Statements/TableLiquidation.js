import React, { useState, useEffect } from "react";
import "fontsource-roboto";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "reactstrap/lib/Table";
import moment from "moment";
import "moment/locale/pt-br";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import { formatCNPJ } from "utils/FormateUtils";
import { formatCurrency } from "utils/FormateUtils";
import api from "services/api";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import { formatCPF } from "utils/FormateUtils";
import { liquidation } from "../../hooks/billings";
const TableLiquidations = () => {
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [comissions, setComissions] = useState([]);
  const [init, setInit] = useState(moment().clone().startOf("month").format());
  const [end, setEnd] = useState(moment().format());
  useEffect(() => {
    const getSumary = async () => {
      let data = await liquidation({ init: init, end: end });
      setOrders(data.orders);
      setTransactions(data.transactions.list_transactions);
      setComissions(data.transactions.commission);
    };
    getSumary();
  }, [init, end]);

  return <></>;
};

export default TableLiquidations;
