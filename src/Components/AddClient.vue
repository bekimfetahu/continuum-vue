<template>
  <div class="container">
    <h3 class="box-title">Add Client</h3>
    <div class="row center-align">
      <div class="col-lg-12">
        <div class="form-group">
          <div class="alert alert-warning" v-if="error" v-text="error"></div>
          <div class="alert alert-success" v-if="success" v-text="success"></div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">First name</label>
          <div class="col-sm-9">
            <input type="text" ref="first_name" v-model="first_name" class="form-control" placeholder="First name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Last name</label>
          <div class="col-sm-9">
            <input type="text" ref="last_name" v-model="last_name" class="form-control" placeholder="Last name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Email</label>
          <div class="col-sm-9">
            <input type="email" ref="email" v-model="email" class="form-control" placeholder="Email">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Avatar</label>
          <div class="col-sm-9">
            <input type="file" ref="file" class="form-control" @change="setFileUpload"/>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 offset-3">
            <input type="checkbox" v-model="disableFrontCheck"> Disable frontend check
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 offset-3">
            <button class="btn btn-info btn-block" type="button" v-if="!loading" @click="submitForm">
              Upload
            </button>
            <button class="btn btn-info btn-block" type="button" disabled v-if="loading">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import errors from "../lib/errors";
  import {mapActions} from "vuex"
  import {clientForm} from "../lib/client-form"

  export default {
    name: "AddClient",
    mixins: [clientForm],
    data() {
      return {
        action: 'create',
      }
    },
    methods: {
      ...mapActions('client', [
        'storeClient',
      ]),
      /*
        Submits the file to the server
      */
      submitForm() {
        if (!this.disableFrontCheck && !this.validForm()) {
          return
        }
        let formData = this.getFormData()

        this.loading = true

        this.storeClient(formData)
          .then(response => {
            if (response.data.error) { // api custom errors (200)
              this.showError(response.data.error)
            } else if (response.data.success) {
              this.resetForm()
              this.showSuccess(response.data.success)
            }
            this.loading = false
          })
          .catch(error => {  // api server validation errors, 422
            this.loading = false
            this.showError(errors.getError(error))
          })
      },
      resetForm() {
        console.log('reset form')
        this.file = ''
        this.first_name = ''
        this.last_name = ''
        this.email = ''
        // this.$refs.file.files[0] = ''
        this.$refs.file.value = '';
      }
    }
  }
</script>

