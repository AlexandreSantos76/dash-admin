import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import * as Loading from "assets/custom/loading-white.json"
import { useForm } from "react-hook-form";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    FormFeedback
} from "reactstrap";
import { useAuth } from "hooks/auth"
import { Link, Redirect, useLocation } from "react-router-dom";


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

export default function RePassword() {
    const auth = useAuth()
    const { register, handleSubmit, watch, errors } = useForm()
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("t")
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const [toLogin, setToLogin] = useState(false)
    const [send, setSend] = useState(false)

    useEffect(() => {
        let fetchData = async () => {            
            setIsLoading(true)
            let verify = await auth.verifyToken(token)
            console.log(verify);
            if (verify) {
                setUser(verify)
                setToLogin(false)

            } else {
                setToLogin(true)
            }
            setIsLoading(false)
        }
        fetchData()

    }, [token,auth])

    const onSubmit = async (data) => {
        data.passwordConfirm = data.passwordconfirm
        setIsLoading(true)
        let sendSubmit = await auth.sendNewPassword(token, data)
        if (sendSubmit) {
            setSend(true)
            setIsLoading(false)
        }
    }

    if (toLogin) {
        return <Redirect to="/auth/login" />
    }
    if (isLoading) {
        return <div className="loading"><Lottie options={defaultOptions} height={120} width={120} /> </div>
    }

    if (send) {
        return (
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-1" style={{ minHeight: "auto" }}>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center mt-4">
                            <h1 className="h2">Perfeito!</h1>
                            <p className="lead">Você redefiniu sua senha de acesso ao MonetizPay. Volte para o Login para acessar sua conta.</p>
                            <div className="text-center mt-3">
                                <a href="/auth/login" className="btn btn-lg btn-primary" title="Clique aqui para acessar sua conta">Voltar para o login</a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        )
    }

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-1" style={{ minHeight: "auto" }}>

                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="p-2 text-center">
                            <img alt="..." src={require("assets/img/brand/logo.svg")} style={{ maxWidth: '80%' }} />
                        </div>
                        <div className="text-center h3 mb-4">
                            <small>Informe uma nova senha de acesso à sua conta.</small>
                        </div>

                        <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup className="mb-3">
                                <Input
                                    placeholder="Nova senha"
                                    type="password"
                                    name="password"
                                    invalid={errors.password ? true : false}
                                    innerRef={register({ required: "Senha Requerida", minLength: { value: 8, message: "A senha deve ter no mínimo 8 caracteres" } })}
                                />
                                <FormFeedback invalid="">{errors.password?.message}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Input
                                    placeholder="Repita a nova senha"
                                    type="password"
                                    name="passwordconfirm"
                                    invalid={errors.passwordconfirm ? true : false}
                                    innerRef={register({ validate: (value) => value === watch('password') || "As senhas devem ser iguais" })}
                                />
                                <FormFeedback invalid="">{errors.passwordconfirm?.message}</FormFeedback>
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
                        <Link className="text-light" to="/auth/login" >
                            <small>Voltar para o Login</small>
                        </Link>
                    </Col>

                </Row>
            </Col>
        </>
    )


}
