import { BaseResult } from '../types'
import { WxRequest } from './request'
import { getStorageSync } from './storage'

export const instance = new WxRequest({
    baseURL: 'http://127.0.0.1:8888/'
})

instance.interceptors.request = (config) => {
    const token = getStorageSync('token')

    if (token) {
        config.header['token'] = token
    }
    return config
}

instance.interceptors.response = <T>(response: BaseResult<T>) => {
    const type = typeof response
    const data = response
    console.log('type:', type)
    console.log('response data：', data)
    console.log('response data code：', data.code)

    if (data.code != 200) {
        wx.toast({ title: '网络异常', icon: 'error' })
    }

    return data
}
