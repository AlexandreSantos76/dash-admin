
import React, { useEffect, useState } from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faBarcode, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import {statement} from "../../hooks/billings"
import moment from "moment"

function Header() {

  const [openChargebacks, setOpenChargebacks] = useState(0);

  useEffect(() => {
    async function loadingData() {
      const init = moment().subtract(30,'days').format()
      const end = moment().format()
      statement({init:init, end:end})
    }

    loadingData();
  }, [])

  
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Faturamento
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          0
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 0%
                      </span>{" "}
                      <span className="text-nowrap">Últimos 30 dias</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Boleto
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          0
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faBarcode} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 0%
                      </span>{" "}
                      <span className="text-nowrap">Últimos 30 dias</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          C. de Crédito
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 0%
                      </span>{" "}
                      <span className="text-nowrap">Últimos 30 dias</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Chargeback
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {openChargebacks}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <FontAwesomeIcon icon={faExchangeAlt} />
                        </div>
                      </Col>
                    </Row>
                    {<p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 0%
                      </span>{" "}
                      <span className="text-nowrap">Últimos 30 dias</span>
                    </p>}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
