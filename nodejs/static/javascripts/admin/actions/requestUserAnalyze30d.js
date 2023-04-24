import {
	REQUEST_USER_ANALYZE_30d
} from '../constants/actionTypes';

function receiveUserAnalyze30(data) {
    console.log("receiveUserAnalyze30:", data)
    let userList = data.users;
    if (userList.length == 0){
        return {
            type: REQUEST_USER_ANALYZE_30d,
            users: [{
                "count": 65,
                "createdAt": new Date().toLocaleDateString().replaceAll("/", "-")
            }]
        };
    }
    return {
        type: REQUEST_USER_ANALYZE_30d,
        users: userList
    };
    
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/user/latest/30';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveUserAnalyze30(json.data)))
    };
}