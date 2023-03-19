var config   = require('../../config/config.js');

Page({
    data: {
    },
    onLoad: function() {
    },
    onCartTap: function(event) {
		wx.setStorageSync('clearCartData', true)
        wx.switchTab({
            url: '/pages/cart/cart',
			success: (e) => {
				var page = getCurrentPages().pop();
				if(page == undefined || page == null) return;
				page.data.clearCartData = true
				page.onLoad();
			}
        });
    }
})