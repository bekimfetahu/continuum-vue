/**
 * Transaction module for retrieving transactions and pagination information
 */
import axios from "axios";

export default {
  namespaced: true,
  state: {
    transactions: [],
    currentPage: 1,
    total: 0,
    perPage: 10,
  },

  getters: {
    getTransactions(state) {
      return state.transactions
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
    setTransactions(state, transactions) {
      state.transactions = transactions
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
    deleteTransaction(state, id) {
      state.transactions.forEach((value, index) => {
        if (value.id == id) {
          state.transactions.splice(index, 1);
          return
        }
      })
    },
  },
  actions: {
    /**
     * Retrieve transactions and setup transactions and pagination data
     * @param commit
     * @param rootGetters
     * @returns {Promise}
     */
    retrieveTransactions({commit, rootGetters}, page) {

      return new Promise((resolve, reject) => {
        const route = '/transactions?page=' + page
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        axios.get(route,headers).then(response => {
          commit('setTransactions', response.data.data)
          commit('setCurrentPage', response.data.pagination.current_page)
          commit('setTotal', response.data.pagination.total)
          commit('setPerPage', response.data.pagination.per_page)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    removeTransaction({commit, getters, rootGetters}, transId) {

      return new Promise((resolve, reject) => {
        const route = '/transactions/' + transId
        const headers = {
          headers: {
            "Authorization": 'Bearer ' + rootGetters['auth/token']
          }
        }
        axios.post(route, {_method: 'DELETE'}, headers).then(response => {
          commit('deleteTransaction', transId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    storeTransaction({commit, rootGetters}, data) {

      return new Promise((resolve, reject) => {
        const route = '/transactions'
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
  },
}
