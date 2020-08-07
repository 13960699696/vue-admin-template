import request from '@/utils/request'

/**
 * 获取密钥列表
 */
export function GetDataList(data) {
    return request({
        url: '/Base_Manage/Base_AppSecret/GetDataList',
        method: 'post',
        data
    })
}
/**
 * 获取密钥信息
 */
export function GetTheData(data) {
    return request({
        url: '/Base_Manage/Base_AppSecret/GetTheData',
        method: 'post',
        data
    })
}
/**
 * 保存密钥
 */
export function SaveData(data) {
    return request({
        url: '/Base_Manage/Base_AppSecret/SaveData',
        method: 'post',
        data
    })
}
/**
 * 删除密钥
 */
export function DeleteData(data) {
    return request({
        url: '/Base_Manage/Base_AppSecret/DeleteData',
        method: 'post',
        data
    })
}