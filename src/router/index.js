import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 菜单公共模块
 */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   如果设置为true，则不会在侧边栏中显示该项（默认为false
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目有多个子路由时,
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果set noRedirect将不会在breadcrumb中重定向
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin']    控制页面角色（可以设置多个角色）
    title: 'title'               在边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    noCache: true                如果设置为true，则不会缓存该页（默认值为false）
    affix: true                  如果设置为true，则标记将附加在tags视图中
    breadcrumb: false            如果设置为false，则项目将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
 * 通用路由
 * 没有权限要求的页面
 * 所有角色都能请求
 */
export const constantRoutes = [
  {
    path: '/Login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/Index',
    children: [
      {
        path: 'Index',
        component: () => import('@/views/Index'),
        name: 'Index',
        meta: { title: '首页', icon: 'Index', affix: true }
      }
    ]
  },
]
/**
 * 权限路由
 * 有权限要求的页面
 * 设置角色能请求
 */
export const asyncRoutes = [
  {
    path: '/Base_Manage',
    component: Layout,
    alwaysShow: true,
    name: 'Base_Manage',
    meta: {
      title: '系统管理',
      icon: 'setting',
    },
    children: [
      {
        path: 'Base_User',
        component: () => import('@/views/Base_Manage/Base_User'),
        name: 'Base_User',
        meta: {
          title: '用户管理',
        }
      },
      {
        path: 'Base_Role',
        component: () => import('@/views/Base_Manage/Base_Role'),
        name: 'Base_Role',
        meta: {
          title: '角色管理',
        }
      },
      {
        path: 'Base_Department',
        component: () => import('@/views/Base_Manage/Base_Department'),
        name: 'Base_Department',
        meta: {
          title: '部门管理',
        }
      },
      {
        path: 'Base_Action',
        component: () => import('@/views/Base_Manage/Base_Action'),
        name: 'Base_Action',
        meta: {
          title: '权限管理',
        }
      },
      {
        path: 'Base_AppSecret',
        component: () => import('@/views/Base_Manage/Base_AppSecret'),
        name: 'Base_AppSecret',
        meta: {
          title: '密钥管理',
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
/**
 * 创建路由
 */
const router = createRouter()
/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
