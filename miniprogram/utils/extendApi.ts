/**
 * 消息提示框
 * @param {} options
 */
export const toast = (options: Record<string, any> = {}) => {
    const { title = '数据加载中...', icon = 'none', duration = 2000, mask = 'ture' } = options
    wx.showToast({
        title,
        icon,
        duration,
        mask
    })
}

/**
 * 消息确认提示框
 */
export const modal = (options: Record<string, any> = {}) => {
    return new Promise((resolve) => {
        const { title = '提示', content = '您确定执行该操作吗?', confirmColor = '#f3514f' } = options

        wx.showModal({
            title,
            content,
            confirmColor,
            ...options,
            success: (res) => {
                if (res.cancel) {
                    resolve(false)
                }
                if (res.confirm) {
                    resolve(true)
                }
            }
        })
    })
}
