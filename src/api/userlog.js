import request from '@/utils/request'

/**
 * 获取系统日志类型列表
 */
export function GetLogTypeList() {
  return request({
    url: '/Base_Manage/Base_UserLog/GetLogTypeList',
    method: 'post'
  })
}

/**
 * 获取系统日志列表
 */
export function GetLogList(data) {
  return request({
    url: '/Base_Manage/Base_UserLog/GetLogList',
    method: 'post',
    data
  })
}
