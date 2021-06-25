import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  CardBody,
} from "reactstrap";
// core components

import { useUsers } from "../../hooks/users";
import { useGateway } from "../../hooks/getnet";

import Header from "components/Headers/Header.js";

import api from "../../services/api";

function Clients() {
  const gateway = useGateway();
  const history = useHistory();
  const { saveSelectedUserId } = useUsers();

  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState(1);

  useEffect(() => {
    async function loadingClients() {
      const response = await api.get(`/users`);
      let users = []
      let data = response.data
      for (let user of data) {
        let newUser = {
          id: user.id,
          name: user.legalName,
          document: user.document,
          subseller: user.subseller.subsellerId,
          plan: user.plan.name,
          status: user.subseller.status
        }
        users.push(newUser)
      }

      setClients(users);
    }
    loadingClients();
  }, [filter]);

  const handleProfile = useCallback(
    (client) => {
      saveSelectedUserId(client.id);
      history.push("/admin/client-profile");
    },
    [history, saveSelectedUserId]
  );

  const handleCallback = async (id, row) => {

    let { status, data } = await gateway.callback(id);
    if (status) {
      let newArr = [...clients];
      newArr[row.rowIndex].status = data.status;
      console.log(newArr[row.rowIndex]);
      setClients(newArr);
    }
  };

  const handleFilter = async (filter) => {
    setFilter(filter);
  };

  const handleNewClient = useCallback(() => {
    history.push(`/admin/client-register`);
  }, [history]);

  const getMuiTheme = createMuiTheme({
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
          border: "1px solid rgba(224, 224, 224, 1)"
        }
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

      },

    },
  })


  const options = {
    elevation: 0,
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
    sortOrder: {
      name: "id",
      direction: "asc",
    },
  }
  const dataCols = [
    {
      label: "ID",
      name: "id",
      options: {
        filter: false,
        customBodyRender: (value) => <Link color="link" to={`/admin/client/${value}`}>{value}</Link>,
      },
    },
    {
      label: "Nome",
      name: "name",
      options: {
        filter: true,
      },
    },
    {
      label: "CPF/CNPJ",
      name: "document",
      options: {
        filter: true,
        sort: false
      },
    },
    {
      label: "Subseller",
      name: "subseller",
      options: {
        filter: true,
        sort: false
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (<>
            <Badge
              color={value === "Aprovado Transacionar"
                ? "success"
                : "Em Análise" || "Trativa de Cadastro" ? "warning" : "danger"
              }
              pill
            >
              {value}
            </Badge>
          </>);
        },
      },
    },
    {
      label: "Ações",
      name: "id",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, index) => {
          return (<>
            <Button
              size="sm"
              color="info"
              onClick={(e) => {
                handleCallback(value, index);
              }}

            >
              Atualizar Situação
            </Button>
          </>);
        }
      },
    },

  ];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                <h3 className="mb-0">Clientes</h3>
                <div>
                  <Button color="primary" onClick={handleNewClient}>
                    Cadastrar
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <MuiThemeProvider theme={getMuiTheme}>
                  <MUIDataTable
                    title={""}
                    data={clients}
                    columns={dataCols}
                    options={options}
                  />
                </MuiThemeProvider>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Clients;
