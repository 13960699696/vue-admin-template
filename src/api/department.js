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