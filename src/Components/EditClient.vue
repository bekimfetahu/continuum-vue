<template>
  <div class="container">
    <h3 class="box-title">Edit Client</h3>
    <div class="row center-align">
      <div class="col-lg-12">
        <div class="form-group">
          <div class="alert alert-warning" v-if="error" v-text="error"></div>
          <div class="alert alert-success" v-if="success" v-text="success"></div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">First name</label>
          <div class="col-sm-10">
            <input type="text" v-model="first_name" class="form-control" placeholder="First name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Last name</label>
          <div class="col-sm-10">
            <input type="text" v-model="last_name" class="form-control" placeholder="Last name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" v-model="email" class="form-control" placeholder="Email">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10 offset-2">
            <img :src="imgSrc">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Avatar</label>
          <div class="col-sm-6">
            <input type="file" ref="file" class="form-control" @change="setFileUpload"/>
          </div>
          <div class="col-sm-4">
            <button class="btn btn-light btn-block" @click="resetFile">Reset</button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10 offset-2">
            <button class="btn btn-info btn-block" @click="submitForm">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import errors from "../lib/errors";
  import {mapActions, mapMutations} from "vuex"

  export default {
    name: "EditClient",
    props: ['id'],
    data() {
      return {
        file: '',
        first_name: '',
        last_name: '',
        email: '',
        success: '',
        error: '',
        imgSrc: '',
      }
    },
    methods: {
      ...mapActions('client', [
        'retrieveClient',
        'updateClient',
      ]),
      submitForm() {
        let formData = new FormData();

        formData.append('avatar', this.file)
        formData.append('first_name', this.first_name)
        formData.append('last_name', this.last_name)
        formData.append('email', this.email)
        formData.append('_method', 'PATCH');

        this.updateClient({id: this.id, data: formData})
          .then(response => {

            if (response.data.success) { // api custom errors (200)
              this.showSuccess(response.data.success)
              this.resetForm
            } else if (response.data.error) {
              this.showError(response.data.error)
            }
          })
          .then(() => {
            this.setupClientData(this.id)
          })
          .catch((error) => {  // api server validation errors, 422
            this.showError(errors.getError(error))
          })
      },

      setFileUpload() {
        this.file = this.$refs.file.files[0];
      },
      resetFile() {
        this.file = ''
        this.$refs.file.value = '';
      },
      showError(message) {
        this.error = message
        setTimeout(() => this.error = '', 15000)
      },
      showSuccess(message) {
        this.success = message
        setTimeout(() => this.success = '', 5000)
      },
      setupClientData(id) {
        this.retrieveClient(id)
          .then(response => {
            const data = response.data.data
            this.first_name = data.first_name
            this.last_name = data.last_name
            this.email = data.email
            this.imgSrc = data.avatar
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
    created() {
      this.setupClientData(this.id)
    }
  }
</script>
