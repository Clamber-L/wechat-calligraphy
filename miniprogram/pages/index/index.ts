Page({
    /**
     * 页面的初始数据
     */
    data: {
        practiceList: [
            {
                image: 'https://cdn.pixabay.com/photo/2024/02/17/16/04/taoism-8579682_960_720.jpg',
                date: '2025-06-01',
                desc: '行书作品《兰亭序》节选'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2019/04/28/15/13/pen-4163403_1280.jpg',
                date: '2025-05-28',
                desc: '楷书日常练习'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2024/02/17/16/04/taoism-8579682_960_720.jpg',
                date: '2025-06-01',
                desc: '行书作品《兰亭序》节选'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2019/04/28/15/13/pen-4163403_1280.jpg',
                date: '2025-05-28',
                desc: '楷书日常练习'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2024/02/17/16/04/taoism-8579682_960_720.jpg',
                date: '2025-06-01',
                desc: '行书作品《兰亭序》节选'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2019/04/28/15/13/pen-4163403_1280.jpg',
                date: '2025-05-28',
                desc: '楷书日常练习'
            }
        ],
        showPopup: true, // 默认打开
        popupData: {
            image: 'https://cdn.pixabay.com/photo/2020/02/23/19/41/lorem-4874474_960_720.jpg',
            desc: '书法比赛火热进行中，点击查看详情！'
        }
    },

    previewImage(e: any) {
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls: this.data.practiceList.map((item) => item.image)
        })
    },

    closePopup() {
        this.setData({ showPopup: false })
    },

    goToActivity() {
        // 跳转到活动详情页面（路径根据你的实际页面改）
        this.setData({ showPopup: false })
        wx.navigateTo({
            url: '/pages/group-buy/group-buy'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */

    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
        console.log(opts.target)
        return {}
    }
})
