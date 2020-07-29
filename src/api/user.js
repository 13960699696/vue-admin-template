import request from '@/utils/request'

//用户登录
export function login(data) {
  return request({
    url: '/Base_Manage/Home/SubmitLogin',
    method: 'post',
    data
  })
}
//获取用户信息
export function getInfo() {
  return request({
    url: '/Base_Manage/Home/GetOperatorInfo',
    method: 'post',
  })
}
