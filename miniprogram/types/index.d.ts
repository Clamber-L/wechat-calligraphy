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
