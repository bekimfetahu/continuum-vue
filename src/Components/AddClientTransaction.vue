<template>
  <div class="container">
    <h3 class="box-title">Add client transaction</h3>
    <div class="row center-align">
      <div class="col-lg-12">
        <div class="form-group">
          <div class="alert alert-warning" v-if="error" v-text="error"></div>
          <div class="alert alert-success" v-if="success" v-text="success"></div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Client</label>
          <div class="col-sm-9">{{name}}</div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Amount</label>
          <div class="col-sm-9">
            <input type="text" ref="amount" v-model="amount" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 offset-3">
            <button class="btn btn-info btn-block" @click="submitForm">Add transaction</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import errors from "../lib/errors";
  import {mapActions} from "vuex"

  export default {
    name: "AddClientTransaction",
    props: ['id'],
    data() {
      return {
        name: '',
        amount: '',
        success: '',
        error: '',
      }
    },
    methods: {
      ...mapActions('client', [
        'retrieveClient',
      ]),
      ...mapActions('transaction', [
        'storeTransaction',
      ]),
      submitForm() {
        this.error = ''
        if (!this.validAmount()) {
          this.showError('Invalid amount')
          this.$refs.amount.focus()
          return false
        }
        this.storeTransaction({client_id: this.id, amount: this.amount})
          .then(response => {
            if (response.data.success) {
              this.showSuccess(response.data.success)
            } else if (response.data.error) { // api custom errors (200)
              this.showError(response.data.error)
            }
          })
          .catch((error) => {  // api server validation errors, 422
            this.showError(errors.getError(error))
          })
      },
      // is numeric  and greater than zero
      validAmount() {
        return !isNaN(this.amount) && this.amount > 0
      },
      setupClientData(id) {
        this.retrieveClient(id)
          .then(response => {
            const data = response.data.data
            this.name = data.first_name + ' ' + data.last_name
          })
          .catch(error => {
            console.log(error)
          })
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

    /**
     * Get Client data
     */
    created() {
      this.setupClientData(this.id)
    }
  }
</script>
