<template>
  <div class="container">
    <h3 class="box-title">Clients</h3>
    <div class="col-lg-12">
      <div class="form-group">
        <div class="alert alert-warning" v-if="error" v-text="error"></div>
        <div class="alert alert-success" v-if="success" v-text="success"></div>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-table
          ref="clients"
          striped
          hover
          outlined
          :items="clients"
          :fields="fields"
          :per-page="perPage"
          :current-page="page"
          :busy.sync="isBusy"
        >
          <template #cell(avatar)="data">
            <img :src="data.value" width="20" alt="Avatar"/>
          </template>
          <template v-slot:cell(transaction)="row">
            <b-button size="sm" variant="primary" class="mr-2" @click="addTransaction(row.item.id)">
              Add
            </b-button>
          </template>
          <template v-slot:cell(edit)="row">
            <b-button size="sm" class="mr-2" @click="editClient(row.item.id)">
              Edit
            </b-button>
          </template>
          <template v-slot:cell(delete)="row">
            <b-button variant="danger" size="sm" @click="deleteClient(row.item.id)">Delete</b-button>
          </template>

        </b-table>
        <div class="d-flex justify-content-between">
          <div>
            <b-pagination
              v-model="page"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="clients"
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
        fields: ["id", "first_name", "last_name", "avatar", "email","transaction", "edit", "delete"],
        page: this.getCurrentPage ? this.getCurrentPage : 1,
        isBusy: false,
        error:'',
        success:'',
      };
    },
    methods: {
      ...mapMutations('client', [
        'setClients',
        'setCurrentPage',
        'deleteClient'
      ]),
      ...mapActions('client', [
        'retrieveClients',
        'removeClient'
      ]),
      clients() {
        this.isBusy = true
        return this.retrieveClients(this.page)
          .then((result) => {
            const items = result.data.data
            this.isBusy = false
            return (items)
          }).catch(error => {
            this.isBusy = false
            return []
          })
      },
      deleteClient(id) {
        this.removeClient(id)
          .then(response => {
            this.$refs.clients.refresh()
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
      editClient(id) {
        this.$router.push({ name: 'edit_client',params: {id: id}})
      },
      addTransaction(id) {
        console.log(id);
        this.$router.push({ name: 'add_transaction',params: {id: id}})
      },
      showError(message) {
        this.error = message
        setTimeout(() => this.error = '', 15000)
      },
      showSuccess(message) {
        this.success = message
        setTimeout(() => this.success = '', 5000)
      },
    },
    computed: {
      ...mapGetters('client', [
        'getClients',
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
  .update-btn {
    margin-top: 25px;
  }
</style>

