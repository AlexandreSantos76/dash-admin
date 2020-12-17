import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import * as Loading from "assets/custom/loading-white.json"

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import { useAuth } from "hooks/auth"
import { FormAlert } from 'hooks/Alert';
import { Link } from "react-router-dom";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

const Login = () => {
    const auth = useAuth()
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [errorState, setErrorState] = useState(false)
    const [send, setSend] = useState(false)

    useEffect(() => {
        setIsLoading(false)
    }, [])


    const handleSignIn = async e => {
        e.preventDefault();
        if (!email) {
            setError("E-mail requerido!")
            setErrorState(true)
        } else {
            try {
                setIsLoading(true)
                let status = await auth.resetPassword(email);
                if (status) {
                    setIsLoading(false)
                    setSend(true)
                } else {

                    setIsLoading(false)
                    setError("Email não localizado!")
                    setErrorState(true)
                    setSend(false)
                }
            } catch (err) {
                setIsLoading(false)
                setError("Email não localizado!")
                setErrorState(true)
            }
        }

    };


    return (
        <>
            {isLoading ? (
                <div className="loading"><Lottie options={defaultOptions} height={120} width={120} /> </div>
            ) : (
                    <>
                        {!send ? (
                            <Col lg="5" md="7">
                                <Card className="bg-secondary shadow border-1" style={{ minHeight: "auto" }}>

                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="p-2 text-center">
                                            <img alt="..." src={require("assets/img/brand/logo.svg")} style={{ maxWidth: '80%' }} />
                                        </div>
                                        <div className="text-center h3 mb-4">
                                            <small>Digite seu e-mail abaixo</small>
                                        </div>
                                        <FormAlert visible={errorState} msg={error} color="danger" />
                                        <Form role="form" onSubmit={handleSignIn}>
                                            <FormGroup className="mb-3">

                                                <Input
                                                    placeholder="E-mail"
                                                    type="email"
                                                    autoComplete="new-email"
                                                    onChange={e => setEmail(e.target.value)}
                                                />

                                            </FormGroup>


                                            <div className="text-center">
                                                <Button block className="my-4" color="primary" type="submit">
                                                    Recuperar
                                            </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Row className="mt-3">
                                    <Col xs="12">
                                        <Link
                                            className="text-light"
                                            to="/auth/login"
                                        >
                                            <small>Voltar para o Login</small>
                                        </Link>
                                    </Col>

                                </Row>
                            </Col>
                        ) : (
                                <Col lg="5" md="7">
                                    <Card className="bg-secondary shadow border-1" style={{ minHeight: "auto" }}>
                                        <CardBody className="px-lg-5 py-lg-5">
                                            <div className="text-center mt-4">
                                                <h1 className="h2">Perfeito!</h1>
                                                <p className="lead">Acabamos de enviar para o seu endereço de e-mail uma mensagem para que você possa redefinir sua senha de acesso ao MonetizPay. Em alguns minutos, verifique sua caixa de entrada.</p>
                                                <div className="text-center mt-3">
                                                    <a href="/auth/login" className="btn btn-lg btn-primary" title="Clique aqui para acessar sua conta">Voltar para o login</a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )}
                    </>
                )}
        </>
    );

}

export default Login;
