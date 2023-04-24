import {
    REQUEST_RECENT_COMMENT
} from '../constants/actionTypes';

function receiveRecentComment30d(data) {
    console.log("receiveRecentComment30d")
    console.log(REQUEST_RECENT_COMMENT, data)
    return {
        type: REQUEST_RECENT_COMMENT,
        comments: data.comments
    };
}


export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/comment/latest/30';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveRecentComment30d(json.data)))
    };
}

