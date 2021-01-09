<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        file: ''
      }
    },

    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
        let formData = new FormData();

        /*
            Add the form data we need to submit
        */
        formData.append('file', this.file);

        /*
          Make the request to the POST /single-file URL
        */
        axios.post( '/single-file',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
          .catch(function(){
            console.log('FAILURE!!');
          });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>

<template>
  <div>
      <div class="row center-align">
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
            <label class="col-sm-2 col-form-label">Avatar</label>
            <div class="col-sm-10">
              <input type="file" ref="file" class="form-control" @change="handleFileUpload"/>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10 offset-2">
              <button class="btn btn-info btn-block" @click="upload">Add client</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex"

  export default {
    name: "AddClient",
    data() {
      return {
        file: '',
        first_name: '',
        last_name: '',
        email: ''
      }
    },
    methods: {
      ...mapActions('client',[
        'storeClient',
      ]),
      /*
        Submits the file to the server
      */
      upload(){
        let formData = new FormData();

        formData.append('avatar', this.file)
        formData.append('first_name',this.first_name)
        formData.append('last_name',this.last_name)
        formData.append('email',this.email)

        this.storeClient(formData)
        .then(result=>{
          console.log(result)
        })
        .catch(error=>{
          console.log(error.response.data.errors)
        })
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>

<style scoped>
  .center-align {
    margin: 0 auto;
    width: 70%;
  }
</style>
