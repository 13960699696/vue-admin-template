import request from '@/utils/request'

/**
 * 获取数据库连接信息列表
 */
export function GetDataList(data) {
  return request({
    url: '/Base_Manage/Base_DbLink/GetDataList',
    method: 'post',
    data
  })
}
/**
 * 获取数据库连接信息
 */
export function GetTheData(data) {
  return request({
    url: '/Base_Manage/Base_DbLink/GetTheData',
    method: 'post',
    data
  })
}
/**
 * 保存数据库连接信息
 */
export function SaveData(data) {
  return request({
    url: '/Base_Manage/Base_DbLink/SaveData',
    method: 'post',
    data
  })
}
/**
 * 删除数据库连接信息
 */
export function DeleteData(data) {
  return request({
    url: '/Base_Manage/Base_DbLink/DeleteData',
    method: 'post',
    data
  })
}
