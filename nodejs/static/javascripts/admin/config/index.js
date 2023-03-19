let id = 1;

function getId() {
	return '' + (id++);
}

var sidebarData = [
	{
		id    : getId(),
		title : 'Platform Information',
		children: [
			{
				id    : getId(),
				title : 'System Homepage',
				url   : '/'
			},
			// {
			// 	id    : getId(),
			// 	title : '用户分析',
			// 	url   : '/user/analyze'
			// },
			{
				id    : getId(),
				title : 'Order Analyze',
				url   : '/order/analyze'	
			},
			{
				id    : getId(),
				title : 'Product Analyze',
				url   : '/product/analyze'	
			}
		]
	},
	{
		id    : getId(),
		title : 'Settings',
		children: [
			{
				id    : getId(),
				title : 'Wemall Settings'	
			}
			// {
			// 	id    : getId(),
			// 	title : '地址设置'
			// },
			// {
			// 	id    : getId(),
			// 	title : '支付宝设置'
			// },
			// {
			// 	id    : getId(),
			// 	title : '微信设置'
			// },
			// {
			// 	id    : getId(),
			// 	title : '短信验证设置'
			// }
		]
	},
    {
        id    : getId(),
        title : 'Management',
        children: [
            {
                id    : getId(),
                title : 'Product Category Management',
                url   : ['/category/manage', /^\/category\/edit\/[0-9]+$/]
            },
            {
                id    : getId(),
                title : 'Product Management',
                url   : ['/product/manage', '/product/add', /^\/product\/edit\/[0-9]+$/]
            }
            // {
            //     id    : getId(),
            //     title : '评论管理'
            // }
        ]
    },
    // {
    //     id    : getId(),
    //     title : '插件管理',
    //     children: [
    //     	{
    //             id    : getId(),
    //             title : '插件管理'
    //         }
    //     ]
    // }
];

export default {
	sidebarData: sidebarData
};