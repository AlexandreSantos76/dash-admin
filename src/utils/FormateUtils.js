import React from 'react'
import { func } from 'prop-types';
export function formatCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatPhone(v) {
    v = v.replace(/\D/g, "");             //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}

export function formatarCEP(str) {
    var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;

    if (re.test(str)) {
        return str.replace(re, "$1.$2-$3");
    } else {
        alert("CEP inválido!");
    }

    return "";
}
export function formatCurrency(value) {
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    let formatted = formatter.format(value);
    return formatted
}
export function formatPercentage(value) {
    let v = value / 100
    v = v.toLocaleString('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    
    return v
}


export function formatDate(date) {
    let ds = new Date(date)
    let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: "2-digit", minute: "2-digit" };
    let dtFmt = ds.toLocaleString("pt-BR", options)
    return dtFmt
}

function formatReal(int) {
    var tmp = int + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return tmp;
}