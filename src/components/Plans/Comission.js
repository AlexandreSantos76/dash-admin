import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import boleto from '../../assets/img/bandeiras/boleto.svg'
import american_express from '../../assets/img/bandeiras/american_express.svg';
import visa from '../../assets/img/bandeiras/visa.svg';
import hiper_card from '../../assets/img/bandeiras/hiper_card.svg';
import master_card from '../../assets/img/bandeiras/master_card.svg';
import elo from '../../assets/img/bandeiras/elo.svg';
import api from "services/api";
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const comissions = [
    {
        brand: `Boleto`,
        name: 'Boleto',
        img: boleto,
    },
    {
        brand: `Visa`,
        name: 'Crédito a Vista',
        img: visa,
    },
    {
        brand: `Visa`,
        name: 'Parcelado 3x',
        img: visa,
    },
    {
        brand: `Visa`,
        name: 'Parcelado 6x',
        img: visa,
    },
    {
        brand: `Visa`,
        name: 'Parcelado 9x',
        img: visa,
    },
    {
        brand: `Visa`,
        name: 'Parcelado 12x',
        img: visa,
    },
    {
        brand: `Mastercard`,
        name: 'Crédito a Vista',
        img: master_card,
    },
    {
        brand: `Mastercard`,
        name: 'Parcelado 3x',
        img: master_card,
    },
    {
        brand: `Mastercard`,
        name: 'Parcelado 6x',
        img: master_card,
    },
    {
        brand: `Mastercard`,
        name: 'Parcelado 9x',
        img: master_card,
    },
    {
        brand: `Mastercard`,
        name: 'Parcelado 12x',
        img: master_card,
    },
    {
        brand: `Amex`,
        name: 'Crédito a Vista',
        img: american_express,
    },
    {
        brand: `Amex`,
        name: 'Parcelado 3x',
        img: american_express,
    },
    {
        brand: `Amex`,
        name: 'Parcelado 6x',
        img: american_express,
    },
    {
        brand: `Amex`,
        name: 'Parcelado 9x',
        img: american_express,
    },
    {
        brand: `Amex`,
        name: 'Parcelado 12x',
        img: american_express,
    },
    {
        brand: `Elo`,
        name: 'Crédito a Vista',
        img: elo,
    },
    {
        brand: `Elo`,
        name: 'Parcelado 3x',
        img: elo,
    },
    {
        brand: `Elo`,
        name: 'Parcelado 6x',
        img: elo,
    },
    {
        brand: `Elo`,
        name: 'Parcelado 9x',
        img: elo,
    },
    {
        brand: `Elo`,
        name: 'Parcelado 12x',
        img: elo,
    },
    {
        brand: `Hipercard`,
        name: 'Crédito a Vista',
        img: hiper_card,
    },
    {
        brand: `Hipercard`,
        name: 'Parcelado 3x',
        img: hiper_card,
    },
    {
        brand: `Hipercard`,
        name: 'Parcelado 6x',
        img: hiper_card,
    },
    {
        brand: `Hipercard`,
        name: 'Parcelado 9x',
        img: hiper_card,
    },
    {
        brand: `Hipercard`,
        name: 'Parcelado 12x',
        img: hiper_card,
    },

]
function Comission() {
    const { register, errors, handleSubmit } = useForm();
    const [data, setData] = useState(comissions)
    return (
        <>
            {data?.map((brand, key) => {
                return (
                    <Card key={key} className="mt-3">
                        <CardHeader><img src={brand.img} alt={brand.visa} style={{ maxHeight: "15px" }} /> - {brand.name}</CardHeader>
                        <CardBody>
                            <Form>
                                <Input type="hidden" value={brand.name} />
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Tipo:</Label>
                                            <Input type="select" name="type">
                                                <option value="fixed">Fixa</option>
                                                <option value="percentage">Porcentagem</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Taxa:</Label>
                                            <Input type="text" name="value" />
                                        </FormGroup>
                                    </Col>

                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                )
            }
            )}

        </>
    )
}

export default Comission