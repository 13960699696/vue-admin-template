import store from '@/store'

const { body } = document
const WIDTH = 992

export default {
  /**
   * 监听路由变化如果设备是mobile并且侧边栏导航打开，自动关闭导航条
   */
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  /**
   * 进入前监听网页大小变化
   */
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  /**
   * 离开前移除网页大小监听
   */
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  /**
   * 渲染完成判断是否为移动端，是则关闭侧边栏导航和切换到mobile页面
   */
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    /**
     * 判断是否为移动端
     */
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    /**
     * 监听网页大小变化函数
     */
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
