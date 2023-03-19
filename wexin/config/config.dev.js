var url       = 'https://dev.wemall.com';
var apiPrefix = url + '/api';

var config = {
    name: "Wemall",
    wemallSession: "wemallSession",
    static: {
        imageDomain: url
    },
    api: {
        weAppLogin: '/weAppLogin',
        setWeAppUser: '/setWeAppUser',
        reqCategoryList: '/categories',
        reqProductList: '/products',
        reqProductDetail: '/product/:id',
        addToCart: '/cart/create'
    }
};

for (var key in config.api) {
    config.api[key] = apiPrefix + config.api[key];
}

module.exports = config;