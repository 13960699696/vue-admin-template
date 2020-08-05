import request from '@/utils/request'

/**
 * 获取部门信息
 */
export function GetTreeDataList(data) {
    return request({
        url: '/Base_Manage/Base_Department/GetTreeDataList',
        method: 'post',
        data
    })
}
/**
 * 获取单个部门信息
 */
export function GetTheData(data) {
    return request({
        url: '/Base_Manage/Base_Department/GetTheData',
        method: 'post',
        data
    })
}
/**
 * 保存部门信息
 */
export function SaveData(data) {
    return request({
        url: '/Base_Manage/Base_Department/SaveData',
        method: 'post',
        data
    })
}
/**
 * 删除部门信息
 */
export function DeleteData(data) {
    return request({
        url: '/Base_Manage/Base_Department/DeleteData',
        method: 'post',
        data
    })
}