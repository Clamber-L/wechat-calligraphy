import { BaseResult } from '../types'

export class WxRequest {
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

    // 拦截器
    interceptors = {
        request: (config: any) => config,
        response: (response: any) => response
    }

    constructor(params = {}) {
        this.defaults = {
            ...this.defaults,
            ...params
        }
    }

    request<T = any>(options: any): Promise<BaseResult<T>> {
        options.url = this.defaults.baseURL + options.url
        options = { ...this.defaults, ...options }

        options = this.interceptors.request(options)

        return new Promise((resolve, reject) => {
            if (options.method === 'UPLOAD') {
                if (options.method === 'UPLOAD') {
                    wx.uploadFile({
                        ...options,
                        success: (result) => {
                            const res: BaseResult<T> = JSON.parse(result.data)
                            console.log('res:', res)
                            resolve(this.interceptors.response(res))
                        },
                        fail: (result) => {
                            console.log('reject upload')
                            reject(result)
                        }
                    })
                }
            } else {
                wx.request({
                    ...options,
                    success: (result) => {
                        const res = (result.data as unknown) as BaseResult<T>
                        resolve(this.interceptors.response(res))
                    },
                    fail: (result) => {
                        reject(result)
                    }
                })
            }
        })
    }

    get<T = any>(url: string, config = {}): Promise<BaseResult<T>> {
        return this.request<T>(Object.assign({ url, method: 'GET' }, config))
    }

    post<T = any>(url: string, data = {}, config = {}): Promise<BaseResult<T>> {
        return this.request<T>(Object.assign({ url, data, method: 'POST' }, config))
    }

    uploadFile<T = any>(url: string, filePath: string, name = 'file', config = {}): Promise<BaseResult<T>> {
        return this.request<T>(Object.assign({ url, filePath, name, method: 'UPLOAD' }, config))
    }
}
