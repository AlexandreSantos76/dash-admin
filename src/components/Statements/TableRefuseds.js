import React, { useState, useEffect } from "react";
import "fontsource-roboto";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { refused } from "../../hooks/billings";
import moment from "moment";
import DatetimeRangePicker from "react-datetime-range-picker";
import "moment/locale/pt-br";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import { formatCurrency } from "utils/FormateUtils";
import CodeComponent from "hooks/CodeBlock";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";

const TableRefuseds = (props) => {
  const [transactions, setTransactions] = useState();
  const [modal, setModal] = useState(false);
  const [code, setCode] = useState();
  const [init, setInit] = useState(moment().clone().startOf("month").format());
  const [end, setEnd] = useState(moment().format());
  useEffect(() => {
    async function getSumary() {
      let refuseds = await refused({ init: init, end: end });
      let data = refuseds.orders;
      let arraySum = [];
      data?.forEach((order) => {
        let sum = {
          id: order.id,
          seller: order.shop.user.document,
          value: order.valueTotal,
          create: order.createdAt,
          request:
            typeof order.transations === "object"
              ? order.transations.request
              : "{}",
          response:
            typeof order.transations === "object"
              ? order.transations.response
              : "{}",
        };
        arraySum.push(sum);
      });
      setTransactions(arraySum);
    }
    getSumary();
  }, [end, init]);
  const setRange = (e) => {
    setInit(moment(e.start).format());
    setEnd(moment(e.end).format());
  };
  const toggle = () => setModal(!modal);
  const getMuiTheme = () =>
    createMuiTheme({
      shadows: Array(25).fill("none"),
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
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
        MUIDataTableHeadCell: {
          root: {
            "&:nth-child(5)": {
              width: "70px",
            },
            "&:nth-child(6)": {
              width: "70px",
            },
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
        noMatch: "Nenhum registro encontrado",
      },
    },
  };
  const dataCols = [
    {
      label: "Pedido",
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      label: "Subseller",
      name: "seller",
      options: {
        filter: true,
      },
    },

    {
      label: "Valor",
      name: "value",
      options: {
        filter: false,
        customBodyRender: (value) => <>{formatCurrency(value)}</>,
      },
    },

    {
      label: "Data da Transação",
      name: "create",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <>{moment(value).format("DD/MM/YY HH:MM:SS")}</>;
        },
      },
    },
    {
      label: "Request",
      name: "request",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="text-center">
            <Button
              size="sm"
              color="primary"
              onClick={(e) => {
                setCode(value);
                toggle();
              }}
            >
              Ver
            </Button>
          </div>
        ),
      },
    },
    {
      label: "Response",
      name: "response",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className="text-center">
            <Button
              size="sm"
              color="primary"
              onClick={(e) => {
                setCode(value);
                toggle();
              }}
            >
              Ver
            </Button>
          </div>
        ),
      },
    },
  ];
  const components = {
    ExpandButton: function (props) {
      if (props.dataIndex === 3 || props.dataIndex === 4)
        return <div style={{ width: "24px" }} />;
      return <ExpandButton {...props} />;
    },
  };

  return (
    <>
      <Row>
        <Col>
          <Card style={{ border: "0", boxShadow: "none" }}>
            <CardBody>
              <Row>
                <Col>
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
                    <Col>
                      <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                          title={"Transações do período"}
                          data={transactions}
                          columns={dataCols}
                          options={options}
                          components={components}
                        />
                      </MuiThemeProvider>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal size={"lg"} isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} charCode="X">
          Detalhes da Transação
        </ModalHeader>
        <ModalBody>
          <CodeComponent code={code} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TableRefuseds;
