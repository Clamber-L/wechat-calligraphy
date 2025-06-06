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
        // wx.uploadFile({
        //     url: instance.defaults.baseURL + 'common/upload', // 你的服务器地址
        //     filePath: avatarUrl,
        //     name: 'file', // 和 Rust 中 `field.name()` 对应
        //     success(uploadRes) {
        //         console.log('上传成功', uploadRes)
        //     },
        //     fail(err) {
        //         console.error('上传失败', err)
        //     }
        // })
        instance.uploadFile('common/upload', avatarUrl).then((res) => {
            console.log('上传成功', res)
        })
        this.setData({
            userInfo: {
                ...this.data.userInfo,
                avatar: avatarUrl
            }
        })
    },
    onInput(e: { detail: { value: string } }) {
        const { value } = e.detail
        console.log('输入昵称', value)
        this.setData({
            ['userInfo.username']: value
        })
    }
})
