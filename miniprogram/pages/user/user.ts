import { setStorageSync } from '../../utils/storage'
import { instance } from '../../utils/util'

Page({
    data: {
        userInfo: {}
    },
    onLoad: function (options: { user: string }) {
        wx.setNavigationBarTitle({
            title: '个人信息' //修改title
        })
        const user = JSON.parse(options.user)
        console.log('user:', user)
        this.setData({
            userInfo: user
        })
    },
    onChooseAvatar(e: { detail: { avatarUrl: string } }) {
        const { avatarUrl } = e.detail
        console.log('avatar:', avatarUrl)

        // 上传图片
        instance.uploadFile('common/upload', avatarUrl).then((res) => {
            console.log('上传成功', res)
            this.setData({
                userInfo: {
                    ...this.data.userInfo,
                    avatar: res.data
                }
            })
        })
    },
    onInput(e: { detail: { value: string } }) {
        const { value } = e.detail
        console.log('输入昵称', value)
        this.setData({
            ['userInfo.username']: value
        })
    },
    updateUser() {
        const user = this.data.userInfo
        instance
            .post('applet/user', {
                ...user
            })
            .then((res) => {
                console.log(res.data)
                setStorageSync('userInfo', res.data)
                wx.navigateBack()
            })
    }
})
