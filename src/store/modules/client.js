/**
 * client module for retrieving clients and pagination information
 */
import axios from "axios";

export default {
  namespaced: true,
  state: {
    clients: [],
    currentPage: 1,
    total: 0,
    perPage: 10,
    avatarPath: '',
  },

  getters: {
    getClients(state) {
      return state.clients
    },
    getTotal(state) {
      return state.total
    },
    getCurrentPage(state) {
      return state.currentPage
    },
    getPerPage(state) {
      return state.perPage
    },
    getAvatarPath(state) {
      return state.avatarPath
    },
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setTotal(state, total) {
      state.total = total
    },
    setPerPage(state, perPage) {
      state.perPage = perPage
    },
    setAvatarPath(state, path) {
      state.avatarPath = path
    },
    deleteClient(state, id) {
      state.clients.forEach((value, index) => {
        if (value.id == id) {
          state.clients.splice(index, 1);
          return
        }
      })
    },
  },
  actions: {
    /**
     * Retrieve clients and setup clients and pagination data
     * @param commit
     * @param rootGetters
     * @returns {Promise}
     */
    retrieveClients({commit, rootGetters}, page) {

      return new Promise((resolve, reject) => {
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        const route = '/clients?page=' + page

        axios.get(route, headers).then(response => {
          commit('setClients', response.data.data)
          commit('setCurrentPage', response.data.pagination.current_page)
          commit('setTotal', response.data.pagination.total)
          commit('setPerPage', response.data.pagination.per_page)
          commit('setAvatarPath', response.data.avatar_path)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    removeClient({commit, getters, rootGetters}, clientId) {

      return new Promise((resolve, reject) => {
        const route = '/clients/' + clientId
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        axios.post(route, {_method: 'DELETE'}, headers).then(response => {
          commit('deleteClient', clientId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    retrieveClient({commit, rootGetters}, clientId) {

      return new Promise((resolve, reject) => {
        const route = '/clients/' + clientId
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        axios.get(route, headers).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    storeClient({commit, rootGetters}, data) {

      return new Promise((resolve, reject) => {
        const route = '/clients'
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        axios.post(route, data, headers).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateClient({commit, rootGetters}, post) {

      return new Promise((resolve, reject) => {
        const route = '/clients/' + post.id
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        axios.post(route, post.data, headers).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
}
