import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import api from 'services/api';
import { useForm } from "react-hook-form"
import { cpf } from "cpf-cnpj-validator"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, FormFeedback } from "reactstrap";

import logo from "assets/img/brand/logo.svg"
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é um campo obrigatório.").min(8),
  cpf: Yup.string().test('Valida CPF', 'CPF Inválido', value => cpf.isValid(value)),
  mobile: Yup.string().min(11).required("Telefone é um campo obrigatório."),
  password: Yup.string().min(8).required('Password é um campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
const Register = () => {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });
  const history = useHistory()
  const query = useQuery();
  const invitationToken = query.get("invitation_token");
  const [isValid, setIsValid] = useState();
  const [decodeToken, setDecodeToken] = useState()

  useEffect(() => {
    let validateToken = async () => {
      api.defaults.headers.authorization = `Bearer ${invitationToken}`;
      await api.post("/session/validate-invitation", { token: invitationToken })
        .then(result => {
          let data = result.data
          setIsValid(data.validate)
          setDecodeToken(data.decoded)
        })
        .catch(err => console.log(err))
    }
    validateToken()
  }, [invitationToken])

  const onSubmit = async (data) => {
    api.defaults.headers.authorization = `Bearer ${invitationToken}`;
    await api.post("/session/register", data)
      .then(result => {
        history.push('/auth/login')
      })
      .catch(err => console.log(err))

  }


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-3">
            <div className="text-center">
              <img className="logo" style={{ maxWidth: "200px" }} src={logo} alt="Monetiz Pay" />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Criar Conta</h2>
            </div>
            {isValid &&
              <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" innerRef={register} defaultValue={decodeToken?.email} disabled={true} name="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Nome" type="text" name="name" innerRef={register} invalid={errors.name ? true : false} />
                    <FormFeedback invalid="" className="pl-2">{errors.name?.message}</FormFeedback>
                  </InputGroup>

                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-paper-diploma" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="CPF" type="text" name="cpf" innerRef={register} invalid={errors.cpf ? true : false} />
                    <FormFeedback invalid="">{errors.cpf?.message}</FormFeedback>
                  </InputGroup>

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-mobile" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Celular" type="text" name="mobile" innerRef={register} invalid={errors.mobile ? true : false} />
                    <FormFeedback invalid="">{errors.mobile?.message}</FormFeedback>
                  </InputGroup>

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Senha" type="password" name="password" innerRef={register} invalid={errors.password ? true : false} />
                    <FormFeedback invalid="">{errors.password?.message}</FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Repetir Senha" type="password" name="confirmPassword" invalid={errors.confirmPassword ? true : false} innerRef={register} />
                    <FormFeedback invalid="">{errors.confirmPassword?.message}</FormFeedback>
                  </InputGroup>

                </FormGroup>

                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Criar Conta
                  </Button>
                </div>
              </Form>
            }
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Register;
