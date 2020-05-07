import { login, getInfo } from '@/api/others/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    privilegeResources: [],
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    console.log(token, 'SET_TOKEN')
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTH_RESOURCES: (state, data) => {
    state.privilegeResources = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
    //   login({ uname: username, upwd: password }).then(response => {
    //     const data = response.data.account
    //     console.log(data)
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   })
      const data = {
        token: 'wjbfchviwgeifgqiwvfu'
      }
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(getInfo)
      const response = {
        code: 10000,
        msg: 'success',
        data: {
          account: {
            token: 'elit consequat Ut',
            name: '33',
            userCode: 'USER2019101711120536600000400000',
            status: '1',
            userStatus: '1'
          },
          privilegeResources: [
            {
              code: 'anim reprehenderit',
              appId: 'fugiat reprehenderit',
              parentCode: 'cupidatat veniam dolor incididunt',
              resourceGroupCode: 'enim esse occaecat dolore',
              uri: 'voluptate velit adipisicing in',
              name: 'magna',
              status: -91038943.58647597,
              type: -88876394.50587259
            },
            {
              code: 'in ut',
              appId: 'velit',
              parentCode: 'deserunt magna sed non',
              resourceGroupCode: 'ea anim aute',
              uri: 'velit mollit proident',
              name: 'fugiat dolore ea',
              status: 59860391.494900346,
              type: -55488321.74369948
            }
          ]
        }
      }
      const data = response.data
      const { name, avatar } = data.account
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_AUTH_RESOURCES', data.privilegeResources || [])
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      location.reload()
      resolve()
    })
  },

  // remove token
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

