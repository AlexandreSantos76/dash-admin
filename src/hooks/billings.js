import React from "react";
import Api from "../services/api"

export const statement = (props) => {
    Api.get(`gateway/statement?init=${props.init}&end=${props.end}`)
    .then((result) => {
        console.log(result.data);
    }).catch((err) => {
        
    });
}