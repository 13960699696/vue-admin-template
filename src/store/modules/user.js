import { login,  getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    UserName: '',
    Id: '',
    RoleNames:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, UserName) => {
    state.UserName = UserName
  },
  SET_Id: (state, Id) => {
    state.Id = Id
  },
  SET_RoleNames: (state, RoleNames) => {
    state.RoleNames = RoleNames
  }
}

const actions = {
  /**
   * 用户登录获取token
   * @param {*} param0 
   * @param {*} userInfo 
   */
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password }).then(response => {
        const { Data } = response
        commit('SET_TOKEN', Data)
        setToken(Data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 获取用户信息和权限
   * @param {*} param0 
   */
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { Data } = response
        if (!Data) {
          return reject('验证失败，请重新登录')
        }
        const { UserName, Id, RoleNameList} = Data.UserInfo
        commit('SET_NAME', UserName)
        commit('SET_Id', Id)
        commit('SET_RoleNames', RoleNameList)
        resolve(Data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

