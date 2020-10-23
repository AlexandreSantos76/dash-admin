/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import api from 'services/api';
import {useForm} from "react-hook-form"

// reactstrap components
import { Button,Card, CardHeader,CardBody,FormGroup,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Row,Col} from "reactstrap";

import logo from "assets/img/logo.png"
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Register = () => {
  const query = useQuery();
  const invitationToken = query.get("invitation_token");
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    let validateToken = async () => {
        await api.post("/session/validate-invitation",{token:invitationToken})
            .then(result => {
                let data = result.data
                console.log(data);
                //setIsValid(data)
            })
    }
    validateToken()
}, [])


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-3">
            <div className="text-center">
              <img className="logo" style={{maxWidth:"200px"}} src={logo} alt="Monetiz Pay" />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Criar Conta</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nome" type="text" name="name"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="new-email" name="email" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-paper-diploma" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="CPF" type="text" name="cpf" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-mobile" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Celular" type="text" name="mobile" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Senha" type="password" autoComplete="new-password" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Repetir Senha" type="re-password" autoComplete="new-password" />
                </InputGroup>
              </FormGroup>              
             
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button">
                  Criar Conta
                  </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Register;
