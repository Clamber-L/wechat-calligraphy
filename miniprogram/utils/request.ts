class WxRequest {
    defaults = {
        baseURL: '', // 请求基准地址
        url: '', // 接口的请求路径
        data: null, // 请求参数
        method: 'GET', // 默认的请求方法
        // 请求头
        header: {
            'Content-type': 'application/json' // 设置数据的交互格式
        },
        timeout: 60000, // 默认的超时时长，小程序默认的超时时长是 1 分钟
        isLoading: true // 控制是否使用默认的 loading，默认值是 true 表示使用默认的 loading
    }

    constructor(params = {}) {
        this.defaults = {
            ...this.defaults,
            ...params
        }
    }

    request(options: any) {
        options.url = this.defaults.baseURL + options.url
        options = { ...this.defaults, ...options }

        return new Promise((resolve, reject) => {
            wx.request({
                ...options,
                success: (result) => {
                    resolve(result)
                },
                fail: (result) => {
                    reject(result)
                }
            })
        })
    }

    get(url: string, config = {}) {
        return this.request(Object.assign({ url, method: 'GET' }, config))
    }

    post(url: string, data = {}, config = {}) {
        return this.request(Object.assign({ url, data, method: 'POST' }, config))
    }
}

export const instance = new WxRequest({
    baseURL: 'http://127.0.0.1:8888/applet/'
})
