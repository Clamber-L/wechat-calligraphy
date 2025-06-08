import { BaseResult } from '../types'
import { toast } from './extendApi'
import { WxRequest } from './request'
import { getStorageSync } from './storage'

export const instance = new WxRequest({
    baseURL: 'http://127.0.0.1:8888/'
})

instance.interceptors.request = (config) => {
    const token = getStorageSync('token')

    if (token) {
        config.header['accessToken'] = token
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
        toast({ title: response.message, icon: 'error' })
    }

    return data
}
