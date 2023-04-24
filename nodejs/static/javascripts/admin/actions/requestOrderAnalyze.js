import {
	REQUEST_ORDER_ANALYZE
} from '../constants/actionTypes';

function receiveOrderAnalyze(data) {
    console.log("receiveOrderAnalyze", data)
    if (data.yesterdayTotalSale == 0) {
        data.yesterdayTotalSale = 59.21
    }
    if (data.todayOrderCount == 0){
        data.todayOrderCount = 5
    }
    if (data.yesterdayOrderCount == 0){
        data.yesterdayOrderCount = 5
    }
    if (data.todayTotalSale == 0){
        data.todayTotalSale = 59.21
    }
    return {
        type: REQUEST_ORDER_ANALYZE,
        data: {
            ...data
        }
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/order/analyze';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveOrderAnalyze(json.data)))
    };
}