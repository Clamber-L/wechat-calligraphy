import { toast } from '../../utils/extendApi'
import { setStorageSync } from '../../utils/storage'
import { BaseResult, UserInfo } from '../../types'
import { instance } from '../../utils/util'

// pages/my/my.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        initpanel: [
            {
                url: '/pages/group-buy/group-buy',
                title: '暑假班优惠正式开始(身份:团长)',
                iconfont: 'icon-dingdan'
            }
        ],
        isLoggedIn: false,
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const token = wx.getStorageSync('token')
        const user = wx.getStorageSync('userInfo')
        if (token && user) {
            console.log('user:', user)
            console.log('token:', token)
            this.setData({
                isLoggedIn: true,
                userInfo: user
            })
        }
    },

    // 跳转到登录页面
    toLoginPage() {
        wx.navigateTo({
            url: '/pages/login/login'
        }).then()
    },

    toGroupBuy() {
        wx.navigateTo({
            url: '/pages/group-buy/group-buy'
        })
    },
    getPhoneNumber(e: { detail: { code: string } }) {
        if (!wx.canIUse('button.open-type.getUserInfo')) {
            toast({
                title: '请升级微信版本!'
            })
        }

        // 直接登录
        wx.login({
            success: async (res) => {
                console.log('code:' + res.code)
                await wx.showLoading({
                    title: '数据加载中...',
                    mask: true
                })
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                instance
                    .post('applet/login', {
                        code: res.code,
                        phoneCode: e.detail.code
                    })
                    .then((apiRes: BaseResult<UserInfo>) => {
                        console.log('api res:', apiRes)
                        setStorageSync('token', apiRes.data.token)
                        setStorageSync('userInfo', apiRes.data)

                        this.setData({
                            isLoggedIn: true,
                            userInfo: apiRes.data
                        })
                        wx.hideLoading({})
                    })
                    .catch((_error) => {
                        wx.hideLoading({})
                    })
            }
        })
    },
    userSettingPage() {
        // 跳转到修改个人信息页面
        const userJson = JSON.stringify(this.data.userInfo)
        wx.navigateTo({
            url: '/pages/user/user?user=' + userJson
        })
    }
})
