<template>
  <div class="container">
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
          <template v-slot:cell(actions)="data">
            <b-button variant="danger" @click="deleteClient(data.item.id)">Delete</b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="page"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
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
        fields: ["id", "first_name", "last_name", "avatar", "email", "actions"],
        page: this.getCurrentPage ? this.getCurrentPage : 1,
        isBusy: false,
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
          .then(result => {
            this.$refs.clients.refresh()
          })
          .catch(error => {
            console.log(error)
          })
      }
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
