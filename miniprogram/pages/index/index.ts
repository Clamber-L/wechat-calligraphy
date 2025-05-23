// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl =
    'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

interface User {
    name: string
    avatarUrl: string
}

Component({
    data: {
        userList: [{}], // 用户头像列表
        scrollTarget: '',
        scrollIndex: 0,
        scrollTimer: 0,

        orderList: [{}],
        orderAnimation: null,
        orderY: 0,
        groupSize: 5 // 每组显示5条
    },
    methods: {
        onLoad: function () {
            const users = Array.from({ length: 40 }, (_, i) => ({
                name: `用户${i + 1}`,
                avatarUrl: '/assets/avatar.png' // 替换成你实际头像地址
            }))

            this.setData({ userList: users })

            this.data.scrollIndex = 0
            this.startAutoScroll()

            const orders = Array.from({ length: 20 }, (_, i) => ({
                name: `用户${i + 1}`,
                phone: `18****${1000 + i}`,
                price: '198.00'
            }))

            this.setData({ orderList: orders })

            this.data.orderIndex = 0
            this.startGroupedScroll()
        },
        startAutoScroll() {
            const interval = 2000 // 每2秒滚动
            this.data.scrollTimer = setInterval(() => {
                const total = this.data.userList.length
                const itemsPerRow = 4
                const rows = Math.ceil(total / itemsPerRow)

                this.data.scrollIndex = (this.data.scrollIndex + 1) % rows

                const targetId = `user-${this.data.scrollIndex * itemsPerRow}`
                this.setData({
                    scrollTarget: targetId
                })
            }, interval)
        },
        startGroupedScroll() {
            const groupHeight = 40 * this.data.groupSize
            const totalGroups = Math.ceil(this.data.orderList.length / this.data.groupSize)

            this.data.orderTimer = setInterval(() => {
                this.data.orderIndex = (this.data.orderIndex + 1) % totalGroups
                const orderY = -this.data.orderIndex * groupHeight

                const animation = wx.createAnimation({
                    duration: 500,
                    timingFunction: 'ease'
                })
                animation.translateY(orderY).step()

                this.setData({
                    orderAnimation: animation.export(),
                    orderY
                })
            }, 3000) // 每3秒滚动一组
        },
        onUnload() {
            clearInterval(this.data.scrollTimer), clearInterval(this.data.orderTimer)
        }
    }
})
