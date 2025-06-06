export interface UserInfo {
    token: string
    user_id: string
    username: string
    avatar: string
    phone: string
}

export interface BaseResult<T> {
    code: number
    message: string
    data: T
}
