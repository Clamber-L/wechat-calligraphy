import { BaseResult } from '../types'
import { toast } from './extendApi'
import { WxRequest } from './request'
import { getStorageSync } from './storage'

export const instance = new WxRequest({
    baseURL: 'http://127.0.0.1:8888/'
    // baseURL: 'https://applet.lingyus.cn/app/'
})

instance.interceptors.request = (config) => {
    const token = getStorageSync('token')

    if (token) {
        config.header['accessToken'] = token
    }
    return config
}

instance.interceptors.response = <T>(response: BaseResult<T>) => {
    const data = response

    if (data.code != 200) {
        toast({ title: response.message, icon: 'error' })
    }

    return data
}
