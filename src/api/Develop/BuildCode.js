import request from '@/utils/request'

/**
 * 获取所有数据库连接
 */
export function GetAllDbLink(data) {
  return request({
    url: '/Base_Manage/BuildCode/GetAllDbLink',
    method: 'post',
    data
  })
}
/**
 * 获取数据库表列表
 */
export function GetDbTableList(data) {
  return request({
    url: '/Base_Manage/BuildCode/GetDbTableList',
    method: 'post',
    data
  })
}
/**
 * 代码生成
 */
export function Build(data) {
  return request({
    url: '/Base_Manage/BuildCode/Build',
    method: 'post',
    data
  })
}
