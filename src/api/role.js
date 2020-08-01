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