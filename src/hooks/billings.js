import Api from "../services/api"

export const statement = (props) => {
    return Api.get(`gateway/statement?init=${props.init}&end=${props.end}`)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err);
        });
}