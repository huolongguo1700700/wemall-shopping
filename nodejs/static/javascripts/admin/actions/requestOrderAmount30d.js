import {
	REQUEST_ORDER_AMOUNT_30d
} from '../constants/actionTypes';

function receiveOrderAmount30d(data) {

    let amountList = data.amounts;
    if (amountList.length == 0){
        return {
            type: REQUEST_ORDER_AMOUNT_30d,
            amounts: [{
                "amount": 59.21,
                "payAt": new Date().toLocaleDateString().replaceAll("/", "-")
            }]
        };
    }
    return {
        type: REQUEST_ORDER_AMOUNT_30d,
        amounts: amountList
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/order/amount/latest/30';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveOrderAmount30d(json.data)))
    };
}