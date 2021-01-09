<template>
  <div class="container">
    <h3 class="box-title">Clients</h3>
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
          <template v-slot:cell(edit)="row">
            <b-button size="sm" class="mr-2" @click="editClient(row.item.id)">
              Edit
            </b-button>
          </template>
          <template v-slot:cell(delete)="row">
            <b-button variant="danger" @click="deleteClient(row.item.id)">Delete</b-button>
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
        fields: ["id", "first_name", "last_name", "avatar", "email", "edit", "delete"],
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
      updateClient(id){
         alert(id)
        // let firstName = first_name+id
        // console.log(this.$refs.firstName)
      },
      deleteClient(id) {
        this.removeClient(id)
          .then(result => {
            this.$refs.clients.refresh()
          })
          .catch(error => {
            console.log(error)
          })
      },
      editClient(id) {
        this.$router.push({ name: 'edit_client',params: {id: id}})
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
<style scoped>
  .update-btn {
    margin-top: 25px;
  }
</style>

