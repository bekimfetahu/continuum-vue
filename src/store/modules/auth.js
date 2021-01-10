import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('access_token') || null,
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  },
  getters: {
    loggedIn(state) {
      return state.token != null
    },
    token(state) {
      return state.token
    },
    user(state){
      return state.user
    }
  },
  mutations: {
    retrieveToken(state, data) {
      state.token = data.token.access_token
      state.user = data.user

      localStorage.setItem('access_token', data.token.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    destroyToken(state) {
      state.token = null
      localStorage.clear();
    },
  },
  actions: {
    async retrieveToken({dispatch, commit, rootGetters}, data) {
      commit('destroyToken')

      const post = {
        email: data.email,
        password: data.password,
      }
      return await new Promise(((resolve, reject) => {
          axios.post('/login', post).then(response => {
            if(response.data.token){
              commit('retrieveToken', response.data)
            }
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      )
    },
    destroyToken({store, dispatch, commit, getters}) {

      if (getters.loggedIn) {

        axios.defaults.headers.post['Authorization'] = 'Bearer ' + getters.token

        return new Promise((resolve, reject) => {

          axios.post('/logout').then(response => {

            commit('destroyToken')
            resolve(response)
          }).catch(error => {
            commit('destroyToken')
            reject(error)
          })
        })
      }
    },
  }
}
