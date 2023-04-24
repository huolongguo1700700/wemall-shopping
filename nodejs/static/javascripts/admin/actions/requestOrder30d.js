import {
	REQUEST_ORDER_30d
} from '../constants/actionTypes';

function receiveOrder30d(data) {
    console.log("REQUEST_ORDER_30d")
    console.log(REQUEST_ORDER_30d, data)
    let orderList = data.orders;
    if (orderList.length == 0){
        return {
            type: REQUEST_ORDER_30d,
            orders: [{
                "count": 4,
                "createdAt": new Date().toLocaleDateString().replaceAll("/", "-")
            }]
        };
    }
    return {
        type: REQUEST_ORDER_30d,
        orders: data.orders
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/order/latest/30';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveOrder30d(json.data)))
    };
}