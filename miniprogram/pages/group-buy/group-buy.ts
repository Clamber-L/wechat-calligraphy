import { BaseResult, OperationCount, OperationResponse, PayResponse, TeamResponse, UserInfo } from '../../types'
import { modal, toast } from '../../utils/extendApi'
import { getStorageSync } from '../../utils/storage'
import { instance } from '../../utils/util'

Component({
    data: {
        userList: [{}], // 用户头像列表
        orderList: [{}],
        operation: {} as OperationResponse,
        teamUserList: {} as TeamResponse,
        show: false,
        operationNum: {} as OperationCount,
        fromUser: '',
        canJoin: false
    },

    methods: {
        onLoad(options: { fromUser: string }) {
            if (options.fromUser) {
                // 别人分享的内容，加入团队
                this.setData({
                    fromUser: options.fromUser
                })
            }
        },

        async onShow() {
            await wx.showLoading({
                title: '数据加载中...',
                mask: true
            })
            const localUserInfo: UserInfo = getStorageSync('userInfo')

            // 获取活动信息 判断活动是否结束
            if (localUserInfo) {
                const operationResponse = await instance.get('applet/operation')

                console.log('operationResponse:', operationResponse)

                if (operationResponse.code === 200) {
                    this.setData({
                        operation: operationResponse.data
                    })
                    // 用户团购情况
                    await this.userTeam(operationResponse.data.id)

                    // 获取本次团购的人数
                    const userNumResponse = await instance.get(
                        `applet/operation_user_num?operationId=${operationResponse.data.id}`
                    )

                    if (userNumResponse.code === 200) {
                        this.setData({
                            operationNum: userNumResponse.data
                        })
                    }
                } else {
                    toast({
                        title: '活动不存在或已经结束!'
                    })
                }
            } else {
                toast({
                    title: '登录状态过期'
                })
                wx.switchTab({
                    url: '/pages/my/my'
                })
            }
            await wx.hideLoading({})
        },

        async userTeam(operationId: string) {
            // 获取在本次团购活动中的团队信息
            const teamResponse = await instance.get(`applet/team?operationId=${operationId}`)
            console.log('teamResponse:', teamResponse)

            if (teamResponse.code === 200) {
                this.setData({
                    teamUserList: teamResponse.data
                })

                // 判断加入团队还是创建团队
                if (this.data.fromUser !== '') {
                    // 来自分享页面
                    // 判断是否加入了团队
                    if (!teamResponse.data.hasTeam) {
                        // 没有加入团队 可选择创建团队或加入团队
                        this.setData({
                            canJoin: true
                        })
                    }
                } else {
                    // 来自用户主动进入
                    if (!teamResponse.data.hasTeam) {
                        // 没有加入团队 只能创建团队
                    }
                }
            } else {
                wx.switchTab({
                    url: '/pages/my/my'
                })
            }
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
                path = `/pages/group-buy/group-buy?fromUser=${localUserInfo.userId}`
            } else {
                path = `/pages/group-buy/group-buy`
            }

            console.log('share path:', path)

            return {
                title: '东岸书法课',
                imageUrl:
                    'https://println-g1-carlos.oss-cn-qingdao.aliyuncs.com/wechat/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250704123020_397.jpg',
                path: path
            }
        },

        /**
         * 分享到朋友圈
         */
        onShareTimeline() {
            const localUserInfo: UserInfo = getStorageSync('userInfo')
            let query = ''
            if (localUserInfo) {
                query = `fromUser=${localUserInfo.userId}`
            }
            return {
                title: '东岸书法课',
                query: query,
                imageUrl:
                    'https://println-g1-carlos.oss-cn-qingdao.aliyuncs.com/wechat/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250704123020_397.jpg'
            }
        },

        async myTeam() {
            const localUserInfo: UserInfo = getStorageSync('userInfo')

            if (!localUserInfo) {
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

            // 判断有没有创建团购或者加入团购
            if (this.data.teamUserList.hasTeam) {
                // 已经加入团队 只能查看团队信息
                this.setData({
                    show: true
                })
                return
            }

            // 1、判断是否是从分享页面进入
            // 如果从分享页面进入，判断是否有团队，没有团队判断是加入团队 还是新建团队
            if (this.data.canJoin) {
                // 分享页面进入 点击我的团购
                const modalRes = await modal({
                    title: '提示',
                    content: '您确定创建新的团队，不加入分享的团队吗?'
                })
                if (modalRes) {
                    // 创建团队
                    await this.pay(true)
                }
            } else {
                // 创建团队
                await this.pay(true)
            }
        },

        async joinTeam() {
            // 需要先判断发起者是否支付创建团队成功
            const userPayedResponse = await instance.get(`applet/user_pay?payedUserId=${this.data.fromUser}`)
            if (userPayedResponse.code !== 200) {
                toast({
                    title: '此用户的队伍还未创建,不能加入该团购!'
                })
                return
            }
            await this.pay(false)
        },

        async pay(createTeam: boolean) {
            const payRes: BaseResult<PayResponse> = await instance.post('applet/pay', {
                operationId: this.data.operation.id,
                createTeam,
                joinTeamId: this.data.teamUserList.hasTeam ? this.data.teamUserList.teamId : ''
            })
            console.log(payRes)

            const payResponse = payRes.data
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
                        setTimeout(() => {
                            console.log('navigate to buy page')

                            wx.redirectTo({
                                url: '/pages/group-buy/group-buy'
                            })
                        }, 2000)
                    },
                    fail(err) {
                        console.error('支付失败', err)
                        wx.showToast({ title: '支付失败', icon: 'none' })
                    }
                })
            } catch (error) {
                console.error('调起支付异常', error)
            }
        }
    }
})
