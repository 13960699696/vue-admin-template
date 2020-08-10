import request from '@/utils/request'

/**
 * 用户登录
 * @param {*} data 用户账号，密码
 */
export function login(data) {
  return request({
    url: '/Base_Manage/Home/SubmitLogin',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/Base_Manage/Home/GetOperatorInfo',
    method: 'post',
  })
}
/**
 * 修改密码
 * @param {*} data 用户账号，密码
 */
export function ChangePwd(data) {
  return request({
    url: '/Base_Manage/Home/ChangePwd',
    method: 'post',
    data
  })
}
/**
 * 获取权限菜单列表
 */
export function GetOperatorMenuList() {
  return request({
    url: '/Base_Manage/Home/GetOperatorMenuList',
    method: 'post'
  })
}

/**
 * 获取用户列表
 * @param {*} data all,id,key
 */
export function GetDataList(data) {
  return request({
    url: '/Base_Manage/Base_User/GetDataList',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 * @param {*} data id
 */
export function GetTheData(data) {
  return request({
    url: '/Base_Manage/Base_User/GetTheData',
    method: 'post',
    data
  })
}
/**
 * 保存用户信息
 * @param {*} data id
 */
export function SaveData(data) {
  return request({
    url: '/Base_Manage/Base_User/SaveData',
    method: 'post',
    data
  })
}
/**
 * 删除用户信息
 * @param {*} data [id]
 */
export function DeleteData(data) {
  return request({
    url: '/Base_Manage/Base_User/DeleteData',
    method: 'post',
    data
  })
}