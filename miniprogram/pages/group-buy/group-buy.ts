import { UserInfo } from '../../types'
import { modal, toast } from '../../utils/extendApi'
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
        async checkLogin() {
            if (!wx.canIUse('button.open-type.getUserInfo')) {
                toast({
                    title: '请升级微信版本!'
                })
            }
            const timestamp = Math.floor(new Date().getTime() / 1000)

            const localUserInfo: UserInfo = getStorageSync('userInfo')

            if (localUserInfo) {
                console.log(localUserInfo.username)
                console.log(typeof localUserInfo)
            } else {
                const res = await modal({
                    content: '未登录，请先登录'
                })
                if (res) {
                    await wx.switchTab({
                        url: '/pages/my/my'
                    })
                }
            }

            console.log('当前时间戳为：' + timestamp)
        }
    }
})
