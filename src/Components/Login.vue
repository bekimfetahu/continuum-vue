<template>
  <div class="container">
    <h3 class="box-title">Login</h3>
    <div class="row center-align mt-5">
      <div class="col-lg-12">
        <div class="form-group">
          <div class="alert alert-warning" v-if="error" v-text="error"></div>
        </div>
      </div>
      <div class="col-lg-12">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">E-Mail Address</label>
            <input id="email" v-model="email" type="email" class="form-control" name="email" value=""
                   autofocus="">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" class="form-control" name="password" autocomplete="">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-info btn-block"><i class="fa fa-sign-in"></i>Log in</button>
          </div>

        </form>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex";
  import errors from "../lib/errors";

  export default {
    name: 'login',

    data() {
      return {
        email: '',
        password: '',
        error: '',
      }
    },
    methods: {
      ...mapActions('auth', [
        'retrieveToken',
      ]),
      onSubmit() {
        this.login();
      },
      login() {
        this.retrieveToken({
          email: this.email,
          password: this.password,
        }).then((response) => {
          if (response.data.token) {
            if (this.$route.params.redirect) {
              this.$router.push({name: this.$route.params.redirect})
            } else {
              this.$router.push({name: 'home'})
            }
          }
        }).catch((error) => {
          console.log(error.data)
          this.showError(errors.getError(error))
        })
      },
      showError(message) {
        this.error = message
        setTimeout(() => this.error = '', 15000)
      },
    },
  }


</script>

<style scoped>

  #client-login-form {
    width: 350px;
  }

</style>


