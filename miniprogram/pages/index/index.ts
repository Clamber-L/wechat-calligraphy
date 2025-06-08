import { UserCreationItem, UserCreationResponse } from '../../types'
import { instance } from '../../utils/util'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        practiceList: [] as UserCreationItem[],
        pageNum: 1,
        pageSize: 3,
        showPopup: true, // 默认打开
        popupData: {
            image: 'https://cdn.pixabay.com/photo/2020/02/23/19/41/lorem-4874474_960_720.jpg',
            desc: '书法比赛火热进行中，点击查看详情！'
        },
        hasMore: true,
        isPreviewing: false
    },

    /**
     * 生命周期函数--监听页面显示
     */

    async onShow() {
        if (this.data.isPreviewing) {
            // 从图片预览返回，不请求接口
            this.setData({ isPreviewing: false })
            return
        }
        if (this.data.pageNum === 1) {
            const res: UserCreationResponse<UserCreationItem> = await this.getItem()
            if (res.items.length !== 0) {
                this.setData({
                    ...this.data,
                    practiceList: res.items,
                    pageNum: res.page,
                    pageSize: res.pageSize
                })
            }
        }
    },

    getItem() {
        return instance
            .get(`applet/creation_list?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}`)
            .then((res) => {
                return (res.data as unknown) as UserCreationResponse<UserCreationItem>
            })
    },

    async getMore() {
        if (!this.data.hasMore) return
        await wx.showLoading({
            title: '数据加载中...',
            mask: true
        })
        this.setData({
            ...this.data,
            pageNum: this.data.pageNum + 1
        })
        const res: UserCreationResponse<UserCreationItem> = await this.getItem()
        const newItems = res.items || []

        const hasMore = newItems.length === this.data.pageSize
        this.setData({
            ...this.data,
            practiceList: [...this.data.practiceList, ...newItems],
            pageNum: res.page,
            pageSize: res.pageSize,
            hasMore
        })
        await wx.hideLoading({})
    },

    previewImage(e: any) {
        const current = e.currentTarget.dataset.url
        this.setData({ isPreviewing: true })
        wx.previewImage({
            current,
            urls: this.data.practiceList.map((item) => item.content)
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
