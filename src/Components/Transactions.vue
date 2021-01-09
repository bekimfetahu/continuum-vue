<template>
  <div class="container">
    <h3 class="box-title">Clients</h3>
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
    name: "App",
    data() {
      return {
        fields: ["id", "client", "amount", "time"],
        page: this.getCurrentPage ? this.getCurrentPage : 1,
        isBusy: false,
      };
    },
    methods: {
      ...mapMutations('transaction', [
        'setTransactions',
        'setCurrentPage',
      ]),
      ...mapActions('transaction', [
        'retrieveTransactions',
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
