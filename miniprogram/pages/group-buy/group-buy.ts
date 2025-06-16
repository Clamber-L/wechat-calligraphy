import { BaseResult, OperationCount, OperationResponse, PayResponse, TeamResponse, UserInfo } from '../../types'
import { modal, toast } from '../../utils/extendApi'
import { getStorageSync } from '../../utils/storage'
import { instance } from '../../utils/util'

interface User {
    name: string
    avatarUrl: string
}

Component({
    data: {
        userList: [{}], // 用户头像列表
        orderList: [{}],
        operation: {} as OperationResponse,
        teamUserList: {} as TeamResponse,
        show: false,
        operationNum: {} as OperationCount
    },
    methods: {
        onLoad: function () {
            const users = Array.from({ length: 40 }, (_, i) => ({
                name: `用户${i + 1}`,
                avatarUrl: '/assets/avatar.png' // 替换成你实际头像地址
            }))

            this.setData({ userList: users })

            const orders = Array.from({ length: 20 }, (_, i) => ({
                name: `用户${i + 1}`,
                phone: `18****${1000 + i}`,
                price: '198.00'
            }))

            this.setData({
                orderList: orders
            })
        },

        async onShow() {
            await wx.showLoading({
                title: '数据加载中...',
                mask: true
            })
            const localUserInfo: UserInfo = getStorageSync('userInfo')

            // 获取活动信息 判断活动是否结束
            if (localUserInfo) {
                instance.get('applet/operation').then((res) => {
                    this.setData({
                        operation: res.data
                    })
                    // 判断有没有创建团购或者加入团购
                    instance.get(`applet/team?operationId=${res.data.id}`).then((res) => {
                        if (res.code === 200) {
                            this.setData({
                                teamUserList: res.data
                            })
                        }
                    })
                    // 获取活动人数
                    instance.get(`applet/operation_user_num?operationId=${res.data.id}`).then((res) => {
                        console.log('num:', res)

                        if (res.code === 200) {
                            this.setData({
                                operationNum: res.data
                            })
                        }
                    })
                })
            }
            await wx.hideLoading({})
        },

        hidePopup() {
            this.setData({ show: false })
        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage(obj: any) {
            const localUserInfo: UserInfo = getStorageSync('userInfo')
            let path
            if (localUserInfo) {
                path = `/pages/group-buy/group-buy?fromUser=${localUserInfo.userId}&operationId=${this.data.operation.id}`
            } else {
                path = `/pages/group-buy/group-buy?operationId=${this.data.operation.id}`
            }

            console.log('share path:', path)

            return {
                title: '赶紧买课，早买早享受，晚买享折扣',
                imageUrl: '../../assets/avatar.png',
                path: path
            }
        },

        /**
         * 分享到朋友圈
         */
        onShareTimeline() {
            return {
                title: '帮我砍一刀',
                query: 'id=1',
                imageUrl: '../../assets/avatar.png'
            }
        },
        async myTeam() {
            if (!wx.canIUse('button.open-type.getUserInfo')) {
                toast({
                    title: '请升级微信版本!'
                })
            }
            const localUserInfo: UserInfo = getStorageSync('userInfo')

            if (localUserInfo) {
                // 判断有没有创建团购或者加入团购
                if (!this.data.teamUserList.hasTeam) {
                    // 没有加入团队 没有付款
                    // 判断是否别人邀请
                    // 忽略付款逻辑 直接创建团队
                    wx.login({
                        success: async (res) => {
                            console.log('pay res code:', res.code)

                            instance
                                .post('applet/pay', {
                                    code: res.code,
                                    groupBuyId: '12321'
                                })
                                .then((res: BaseResult<PayResponse>) => {
                                    console.log(res)
                                    const payResponse = res.data
                                    try {
                                        wx.requestPayment({
                                            timeStamp: payResponse.timestamp,
                                            nonceStr: payResponse.nonceStr,
                                            package: payResponse.package,
                                            signType: 'RSA',
                                            paySign: payResponse.paySign,
                                            success(res) {
                                                console.log('支付成功', res)
                                                wx.showToast({ title: '支付成功', icon: 'success' })
                                            },
                                            fail(err) {
                                                console.error('支付失败', err)
                                                wx.showToast({ title: '支付失败', icon: 'none' })
                                            }
                                        })
                                    } catch (error) {
                                        console.error('调起支付异常', error)
                                    }
                                })
                        }
                    })
                } else {
                    this.setData({
                        show: true
                    })
                }
            } else {
                const res = await modal({
                    content: '未登录，请先登录'
                })
                if (res) {
                    const app = getApp()
                    app.globalData.toUserPage = 'buy'
                    await wx.switchTab({
                        url: '/pages/my/my'
                    })
                }
            }
        }
    }
})
