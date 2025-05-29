import { UserInfo } from '../../types'
import { toast } from '../../utils/extendApi'
import { getStorageSync } from '../../utils/storage'
import { instance } from '../../utils/request'

// pages/my/my.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        initpanel: [
            {
                url: '/pages/order/list/list',
                title: '商品订单',
                iconfont: 'icon-dingdan'
            },
            {
                url: '/pages/order/list/list',
                title: '礼品卡订单',
                iconfont: 'icon-lipinka'
            },
            {
                url: '/pages/order/list/list',
                title: '退款/售后',
                iconfont: 'icon-tuikuan'
            }
        ]
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
    onShareAppMessage() {},

    // 跳转到登录页面
    toLoginPage() {
        wx.navigateTo({
            url: '/pages/login/login'
        }).then()
    },

    onChooseAvatar() {
        const localUserInfo = getStorageSync('userInfo')
        console.log(localUserInfo)

        if (localUserInfo) {
            const user: UserInfo = JSON.parse(localUserInfo as string)
        } else {
            toast({ title: '请先授权登陆' })
        }
    },
    checkLogin() {
        if (!wx.canIUse('button.open-type.getUserInfo')) {
            toast({
                title: '请升级微信版本!'
            })
        }
        wx.navigateTo({
            url: '/pages/user/user'
        })
        // 直接登录
        // wx.login({
        //     success: async (res) => {
        //         console.log('code:' + res.code)
        //         await wx.showLoading({
        //             title: "数据加载中...",
        //             mask: true,
        //         })
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //         const apiRes = await instance.post('login', {
        //             code: res.code
        //         })
        //         await wx.hideLoading({})
        //     }
        // })
    }
})
