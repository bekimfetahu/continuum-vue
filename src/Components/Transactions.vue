<template>
  <div class="container">
    <h3 class="box-title">Client transactions</h3>
    <div class="form-group">
      <div class="alert alert-warning" v-if="error" v-text="error"></div>
      <div class="alert alert-success" v-if="success" v-text="success"></div>
    </div>
    <b-row>
      <b-col>
        <b-table
          ref="transactions"
          striped
          hover
          outlined
          :items="transactions"
          :fields="fields"
          :per-page="perPage"
          :current-page="page"
          :busy.sync="isBusy"
        >
          <template v-slot:cell(actions)="row">
            <b-button variant="danger" size="sm" @click="deleteTransaction(row.item.id)">Delete</b-button>
          </template>
        </b-table>
        <div class="d-flex justify-content-between">
          <div>
            <b-pagination
              v-model="page"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </div>
          <div>
            <span>Total items: {{rows}}</span>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from "vuex"

  export default {
    name: "Transactions",
    data() {
      return {
        fields: ["id", "client", "amount", "time", "actions"],
        page: this.getCurrentPage ? this.getCurrentPage : 1,
        isBusy: false,
        error: '',
        success: '',
      };
    },
    methods: {
      ...mapMutations('transaction', [
        'setTransactions',
        'setCurrentPage',
      ]),
      ...mapActions('transaction', [
        'retrieveTransactions',
        'removeTransaction',
      ]),
      transactions() {
        this.isBusy = true
        return this.retrieveTransactions(this.page)
          .then((result) => {
            const items = result.data.data
            this.isBusy = false
            return (items)
          }).catch(error => {
            this.isBusy = false
            return []
          })
      },
      deleteTransaction(id) {
        this.removeTransaction(id)
          .then(response => {
            this.$refs.transactions.refresh()
            if (response.data.success) {
              this.showSuccess(response.data.success)
            } else if (response.data.error) { // api custom errors (200)
              this.showError(response.data.error)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      showError(message) {
        this.error = message
        setTimeout(() => this.error = '', 5000)
      },
      showSuccess(message) {
        this.success = message
        setTimeout(() => this.success = '', 2000)
      },
    },
    computed: {
      ...mapGetters('transaction', [
        'getTransactions',
        'getCurrentPage',
        'getTotal',
        'getPerPage',
      ]),
      rows() {
        return this.getTotal
      },
      perPage() {
        return this.getPerPage
      },
    }
  };
</script>

<style scoped>

</style>
