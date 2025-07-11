export interface UserInfo {
    token: string
    userId: string
    username: string
    avatar: string
    phone: string
}

export interface BaseResult<T> {
    code: number
    message: string
    data: T
}

export interface UserCreationResponse<T> {
    page: number
    pageSize: number
    totalPage: number
    totalSize: number
    items: T[]
}

export interface UserCreationItem {
    id: string
    title: string
    content: string
    description: string
    creationDate: string
    createdTime: string
    updatedTime: string
}

export interface OperationResponse {
    beOpen: boolean
    beEnd: boolean
    contents: OperationContentResponse[]
    createdTime: string
    endTime: string
    id: string
    name: string
}

export interface OperationContentResponse {
    createdTime: string
    id: string
    imageSort: number
    imageUrl: string
    operationId: string
    updatedTime: string
}

export interface TeamResponse {
    hasTeam: boolean
    teamId: string
    userList: TeamUserResponse[]
}

export interface TeamUserResponse {
    username: string
    avatar: string
    userId: string
}

export interface OperationCount {
    todayNum: number
    allNum: number
    userList: TeamUserResponse[]
}

export interface PayResponse {
    prepayId: string
    signType: string
    package: string
    nonceStr: string
    timestamp: string
    paySign: string
}

export interface SettingsResponse {
    id: String
    settingType: number
    settingValue: string
}

export interface OperationUserResponse {
    commander: boolean
    hasOperation: boolean
    joined: boolean
    operationName: string
}
