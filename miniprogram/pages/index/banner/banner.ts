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
                    image: '../../../assets/banner/banner-1.jpg'
                },
                {
                    to: '/pages/group-buy/group-buy',
                    image: '../../../assets/banner/banner-2.jpg'
                },
                {
                    to: '/pages/group-buy/group-buy',
                    image: '../../../assets/banner/banner-3.jpg'
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
