import Api from "../services/api"

export const statement = (props) => {
    return Api.get(`gateway/statement?transaction_date_end=${props.init}&transaction_date_end=${props.end}&liquidation_date_init=${props.init}&liquidation_date_end=${props.end}`)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err);
        });
}

export const refused = (props) => {
    return Api.get(`gateway/statement-refuseds?transaction_date_end=${props.init}&transaction_date_end=${props.end}`)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err);
        });
}