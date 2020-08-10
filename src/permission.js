import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
/**
 * 页面进度条配置
 */
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
/**
 * 路由请求前处理
 */
router.beforeEach(async(to, from, next) => {
  /**
   * 页面进度条开启
   */
  NProgress.start()
  /**
   * 设置页面标题
   */
  document.title = getPageTitle(to.meta.title)
  /**
   * 获取token
   */
  const hasToken = getToken()
  /**
   * 判断是否有token
   */
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.UserName
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          const { UserInfo } = await store.dispatch('user/getInfo')
          // 获取菜单权限
          const accessRoutes = await store.dispatch('permission/generateRoutes', UserInfo.RoleNameList)
          // 添加异步路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户信息失败移除token重新登入
          await store.dispatch('user/resetToken')
          Message.error(error || '获取用户信息失败，请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /**
     * 判断是否为登录页，不是则跳转到登录页面
     */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
/**
 * 路由请求后关闭页面进度条
 */
router.afterEach(() => {
  NProgress.done()
})
