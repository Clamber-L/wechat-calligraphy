import { UserInfo } from '../../types'
import { toast } from '../../utils/extendApi'
import { getStorageSync } from '../../utils/storage'

interface User {
    name: string
    avatarUrl: string
}

Component({
    data: {
        userList: [{}], // 用户头像列表
        orderList: [{}],
        canIUse: wx.canIUse('button.open-type.getUserInfo')
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

        onUnload() {
            clearInterval(this.data.scrollTimer), clearInterval(this.data.orderTimer)
        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage(obj: any) {
            console.log(obj)
            return {
                title: '赶紧买课，早买早享受，晚买享折扣',
                imageUrl: '../../assets/avatar.png',
                path: '/pages/group-buy/group-buy'
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
        checkLogin() {
            if (!wx.canIUse('button.open-type.getUserInfo')) {
                toast({
                    title: '请升级微信版本!'
                })
            }
            const timestamp = Math.floor(new Date().getTime() / 1000)

            const localUserInfo = getStorageSync('userInfo')
            console.log(localUserInfo)
            // 判断token是否过期

            if (localUserInfo) {
                const user: UserInfo = JSON.parse(localUserInfo as string)
            } else {
                wx.getUserProfile({
                    desc: '获取你的用户信息',
                    success: function (res) {
                        var userInfo = res.userInfo
                        // var nickName = userInfo.nickName
                        // var avatarUrl = userInfo.avatarUrl
                        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        // var province = userInfo.province
                        // var city = userInfo.city
                        // var country = userInfo.country
                        console.log('userInfo:', userInfo)

                        wx.login({
                            success: async (res) => {
                                console.log('code:' + res.code)
                                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                                // const apiRes = await instance.post('login', {
                                //     code: res.code
                                // })
                            }
                        })
                    }
                })
            }

            console.log('当前时间戳为：' + timestamp)
        }
    }
})
