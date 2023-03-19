var config = require('../../config/config.js');

Page({
    data: {
        appName: config.name,
        carts: [],
        clearCartData: false
    },
    onLoad: function () {
        var carts = [
            {
                id: 1,
                name: "[Xiaoxuan] Lemon",
                image: {
                    url: "/upload/img/2017/05/28/4ad4c6f6-fc95-4a1e-940b-81f2e6bceaee.jpg"
                },
                price: 198,
                count: 2
            },
            {
                id: 2,
                name: "[Xiaoxuan] Watermelon",
                image: {
                    url: "/upload/img/2017/05/28/4ad4c6f6-fc95-4a1e-940b-81f2e6bceaee.jpg"
                },
                price: 298,
                count: 3
            }
        ]
        for (var i = 0; i < carts.length; i++) {
            carts[i].image.url = config.static.imageDomain + carts[i].image.url;
            carts[i].checked = true;
        }
        this.setData({
            carts: carts,
            clearCartData: this.data.clearCartData
        });
    },
    onPayTap: function (event) {
        wx.navigateTo({
            url: '/pages/pay/pay'
        });
    }
})