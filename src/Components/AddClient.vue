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
            <input type="text" v-model="first_name" class="form-control" placeholder="First name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Last name</label>
          <div class="col-sm-9">
            <input type="text" v-model="last_name" class="form-control" placeholder="Last name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Email</label>
          <div class="col-sm-9">
            <input type="email" v-model="email" class="form-control" placeholder="Email">
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
            <button class="btn btn-info btn-block" @click="upload">Add client</button>
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
    name: "AddClient",
    data() {
      return {
        file: '',
        first_name: '',
        last_name: '',
        email: '',
        success: '',
        error: ''
      }
    },
    methods: {
      ...mapActions('client', [
        'storeClient',
      ]),
      /*
        Submits the file to the server
      */
      upload() {
        let formData = new FormData();

        formData.append('avatar', this.file)
        formData.append('first_name', this.first_name)
        formData.append('last_name', this.last_name)
        formData.append('email', this.email)

        this.storeClient(formData)
          .then(response => {
            if (response.data.error) { // api custom errors (200)
              this.showError(response.data.error)
            } else if (response.data.success) {
              this.showSuccess(response.data.success)
              this.resetForm
            }
          })
          .catch(error => {  // api server validation errors, 422
            this.showError(errors.getError(error))
          })
      },

      setFileUpload() {
        this.file = this.$refs.file.files[0];
      },
      resetForm() {
        this.file = ''
        this.first_name = ''
        this.last_name = ''
        this.email = ''
        this.$refs.file.files[0] = ''
      },
      showError(message) {
        this.error = message
        setTimeout(() => this.error = '', 5000)
      },
      showSuccess(message) {
        this.success = message
        setTimeout(() => this.success = '', 5000)
      }
    }
  }
</script>

