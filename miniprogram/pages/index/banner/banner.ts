// pages/index/banner.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bannerList: {
            type: Array,
            value: [
                {
                    to: '/pages/group-buy/group-buy',
                    image: 'https://cdn.pixabay.com/photo/2024/08/31/06/24/river-9010602_1280.jpg'
                },
                {
                    to: '/pages/group-buy/group-buy',
                    image: 'https://cdn.pixabay.com/photo/2024/08/31/06/24/river-9010602_1280.jpg'
                },
                {
                    to: '/pages/group-buy/group-buy',
                    image: 'https://cdn.pixabay.com/photo/2024/08/31/06/24/river-9010602_1280.jpg'
                }
            ]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
})
