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
/**
 * 获取菜单列表
 */
export function GetMenuTreeList(data) {
  return request({
    url: '/Base_Manage/Base_Action/GetMenuTreeList',
    method: 'post',
    data
  })
}
/**
 * 获取权限
 */
export function GetTheData(data) {
  return request({
    url: '/Base_Manage/Base_Action/GetTheData',
    method: 'post',
    data
  })
}
/**
 * 保存权限
 */
export function SaveData(data) {
  return request({
    url: '/Base_Manage/Base_Action/SaveData',
    method: 'post',
    data
  })
}
/**
 * 删除权限
 */
export function DeleteData(data) {
  return request({
    url: '/Base_Manage/Base_Action/DeleteData',
    method: 'post',
    data
  })
}
