import request from '@/utils/request'

/**
 * 获取角色信息
 */
export function GetDataList(data) {
    return request({
        url: '/Base_Manage/Base_Role/GetDataList',
        method: 'post',
        data
    })
}
/**
 * 保存角色信息
 */
export function SaveData(data) {
    return request({
        url: '/Base_Manage/Base_Role/SaveData',
        method: 'post',
        data
    })
}
/**
 * 获取角色信息
 */
export function GetTheData(data) {
    return request({
        url: '/Base_Manage/Base_Role/GetTheData',
        method: 'post',
        data
    })
}
/**
 * 删除角色信息
 * @param {*} data [id]
 */
export function DeleteData(data) {
    return request({
        url: '/Base_Manage/Base_Role/DeleteData',
        method: 'post',
        data
    })
}