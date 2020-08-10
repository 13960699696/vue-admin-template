import { GetOperatorMenuList } from '@/api/user'
import Layout from '@/layout'
// 前端未找到页面路由（固定不用改）
const notFoundRouter = [{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
}, {
  path: '*', redirect: '/404', hidden: true
}]
// 开发模式额外路由
const devRouter = [
  {
    title: '开发',
    icon: 'code',
    children: [
      {
        path: '/Base_Manage/Base_DbLink/List',
        title: '数据库连接'
      },
      {
        path: '/Base_Manage/BuildCode/List',
        title: '代码生成'
      },
      {
        path: '/Develop/IconSelectorView',
        title: '图标选择'
      },
      {
        path: '/Develop/UploadImg',
        title: '图片上传Demo'
      },
      {
        path: '/Develop/UploadFile',
        title: '文件上传Demo'
      },
      {
        path: '/Develop/Editor',
        title: '富文本Demo'
      },
      {
        path: '/Develop/SelectSearch',
        title: '下拉搜索Demo'
      }
    ]
  }
]
/**
 * 初始化动态路由
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export const initRouter = (to, from, next) => {
  return new Promise((resolve) => {
    generatorDynamicRouter().then(dynamicRouter => {
      // if (process.env.NODE_ENV == 'development') {
      //     dynamicRouter.push(...devRouter)
      // }
      dynamicRouter.push(...notFoundRouter)
      resolve(dynamicRouter)
    })
  })
}

/**
 * 获取路由菜单信息
 * 1. 调用 getRouterByUser() 访问后端接口获得路由结构数组
 * 2. 调用
 * @returns {Promise<any>}
 */
const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    getRouterByUser().then(res => {
      const generatorRouter = generator(res)
      resolve(generatorRouter)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 获取后端路由信息的
 * @returns {Promise}
 */
const getRouterByUser = () => {
  return new Promise((resolve, reject) => {
    GetOperatorMenuList({}).then(resJson => {
      if (resJson.Success) {
        resolve(resJson.Data)
      }
    })
  })
}

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
const generator = (routerMap, parent = '') => {
  return routerMap.map(item => {
    const fullpath = parent + item.path
    // 判断是否有children
    const hasChildren = item.children && item.children.length > 0
    // 当前路由
    const currentRouter = {}
    currentRouter.path = item.path
    currentRouter.name = item.path.slice(1)
    currentRouter.meta = { title: item.title, icon: item.icon || undefined }
    currentRouter.component = (resolve) => require([`@/views${fullpath}`], resolve)
    // 层级为第一层添加的额外属性
    if (hasChildren && item.Level == 1) {
      currentRouter.component = Layout
      currentRouter.alwaysShow = true
    }
    // 有children则取递归菜单
    if (hasChildren) {
      currentRouter.children = generator(item.children, fullpath)
    }

    return currentRouter
  })
}
