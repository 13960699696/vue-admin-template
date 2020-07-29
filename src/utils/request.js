import axios from 'axios'
import Qs from 'qs';
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.common = {
        'Authorization': 'Bearer' + ' ' + getToken(),
        'version': '1.0',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    if (config.data && config.data.isFormData) {
      config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
      // 转化成formData格式
      // transformRequest只能用在 PUT, POST, PATCH 这几个请求方法
      config.transformRequest = [function (data) {
        delete data.isFormData;
        var test2 = Qs.stringify(data);
        return test2;
      }]
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
//响应拦截器即异常处理 -  -- 服务给客户端的数据进行处理
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.Success === false) {
      Message({
        message: res.Msg || '未知错误',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.ErrorCode === 401) {
        // to re-login
        MessageBox.confirm('您已退出，您可以取消停留在该页上，或重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
        })
      }
      return Promise.reject(new Error(res.Msg || '未知错误'))
    } else {
      return Promise.resolve(res);
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
