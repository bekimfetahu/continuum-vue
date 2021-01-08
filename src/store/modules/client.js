/**
 * client module for retrieving clients and pagination information
 */
import axios from "axios";

const apiBaseURL = process.env.SERVER_API

export default {
  namespaced: true,
  state: {
    clients: [],
    currentPage: 1,
    total: 0,
    perPage: 10,
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
    deleteClient(state, id) {
      state.clients.forEach((value, index) => {
        if (value.id == id) {
          state.clients.splice(index, 1);
          return
        }
      })
    }
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
        const route = '/clients?page=' + page

        axios.get(route).then(response => {
          commit('setClients', response.data.data)
          commit('setCurrentPage', response.data.current_page)
          commit('setTotal', response.data.total)
          commit('setPerPage', response.data.per_page)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    removeClient({commit, rootGetters}, clientId) {

      return new Promise((resolve, reject) => {
        const route = '/clients/destroy/' + clientId
        axios.post(route,{_method:'DELETE'}).then(response => {
          commit('deleteClient',clientId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
}
