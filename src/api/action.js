import request from '@/utils/request'

/**
 * 获取权限信息
 */
export function GetActionTreeList(data) {
    return request({
        url: '/Base_Manage/Base_Action/GetActionTreeList',
        method: 'post',
        data
    })
}
/**
 * 获取权限列表
 */
export function GetAllActionList(data) {
    return request({
        url: '/Base_Manage/Base_Action/GetAllActionList',
        method: 'post',
        data
    })
}