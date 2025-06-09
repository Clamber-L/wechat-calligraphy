import { toast } from '../../utils/extendApi'
import { setStorageSync } from '../../utils/storage'
import { BaseResult, UserInfo } from '../../types'
import { instance } from '../../utils/util'
Page({
    data: {
        initpanel: [
            {
                url: '/pages/group-buy/group-buy',
                title: '暑假班优惠正式开始(身份:团长)',
                iconfont: 'icon-dingdan'
            }
        ],
        isLoggedIn: false,
        userInfo: {},
        from: ''
    },

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
        // 检查是否参与过拼团
    },

    toGroupBuy() {
        wx.navigateTo({
            url: '/pages/group-buy/group-buy'
        })
    },
    getPhoneNumber(e: { detail: { code: string; errMsg: string } }) {
        if (!wx.canIUse('button.open-type.getUserInfo')) {
            toast({
                title: '请升级微信版本!'
            })
        }
        if (e.detail.errMsg === 'getPhoneNumber:ok') {
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

                            const app = getApp()
                            if (app.globalData.toUserPage === 'buy') {
                                app.globalData.toUserPage = ''
                                wx.navigateTo({
                                    url: '/pages/group-buy/group-buy'
                                })
                            }
                        })
                        .catch((_error) => {
                            wx.hideLoading({})
                        })
                }
            })
        } else {
            toast({
                title: '登录已取消'
            })
        }
    },
    userSettingPage() {
        // 跳转到修改个人信息页面
        const userJson = JSON.stringify(this.data.userInfo)
        wx.navigateTo({
            url: '/pages/user/user?user=' + userJson
        })
    }
})
