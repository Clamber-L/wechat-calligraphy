export const setStorageSync = (key: string, value: any) => {
    try {
        wx.setStorageSync(key, value)
    } catch (error) {
        console.error(`存储指定${key}发生了异常,`, error)
    }
}

export const getStorageSync = (key: string) => {
    try {
        const value = wx.getStorageSync(key)
        if (value) {
            return value
        }
    } catch (error) {
        console.error(`获取指定${key}发生了异常,`, error)
    }
}

export const removeStorageSync = (key: string) => {
    try {
        wx.removeStorageSync(key)
    } catch (error) {
        console.error(`移除指定${key}发生了异常,`, error)
    }
}

export const clearStorageSync = () => {
    try {
        wx.clearStorageSync()
    } catch (error) {
        console.error(`清除全部key发生了异常,`, error)
    }
}

export const asyncSetStorage = (key: string, data: any) => {
    return new Promise((resolve) => {
        wx.setStorage({
            key,
            data,
            complete: (res) => {
                resolve(res)
            }
        })
    })
}

export const asyncGetStorage = (key: string) => {
    return new Promise((resolve) => {
        wx.getStorage({
            key,
            complete: (res) => {
                resolve(res)
            }
        })
    })
}

export const asyncRemoveStorage = (key: string) => {
    return new Promise((resolve) => {
        wx.removeStorage({
            key,
            complete: (res) => {
                resolve(res)
            }
        })
    })
}

export const asyncClearStorage = () => {
    return new Promise((resolve) => {
        wx.clearStorage({
            complete: (res) => {
                resolve(res)
            }
        })
    })
}
