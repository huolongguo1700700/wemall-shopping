import {
	REQUEST_SYSTEM_INDEX,
	REQUEST_RECENT_PV,
	REQUEST_ORDER_30d,
	REQUEST_USER_ANALYZE_30d,
	REQUEST_RECENT_COMMENT
} from '../constants/actionTypes';

let initState = {
    todayOrderCount : globalData.todayOrderCount,
    todayTotalSale  : globalData.todayTotalSale,
    totalOrderCount : globalData.totalOrderCount,
    totalSale       : globalData.totalSale,
    recentPV: [],
	orders: [],
	users: [],
	comments: []
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_SYSTEM_INDEX: {
			return state;
		}
		case REQUEST_RECENT_PV: {
			return {
				...state,
				recentPV: action.recentPV
			};
		}
		case REQUEST_ORDER_30d: {
			return {
				...state,
				orders: action.orders
			};
		}
		case REQUEST_USER_ANALYZE_30d: {
			return {
				...state,
				users: action.users
			};
		}
		case REQUEST_RECENT_COMMENT: {
			return {
				...state,
				comments: action.comments
			};
		}
		default: {
			return state
		}
	}
}



