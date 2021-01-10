<template>
  <div id="menu">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <a class="navbar-brand" href="#">
        <img src="https://static.continuumeconomics.com/img/continuum-economics-reversed-blue.png">
      </a>
      <!-- Links -->
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{name:'home'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'clients'}">Clients</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'transactions'}">All transactions</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'add_client'}">Add Client</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!loggedIn">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']"/>
          <router-link :to="{name:'login'}">Login</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <font-awesome-icon :icon="['fas', 'user']"/>
          <span class="name">{{user.name}}</span>
          <font-awesome-icon :icon="['fas', 'sign-out-alt']"/>
          <router-link :to="{name:'logout'}">Logout</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  export default {
    name: "MenuTop",
    computed: {
     ...mapGetters('auth',[
       'user',
       'loggedIn'
     ]),
    },
    mounted() {
       console.log(this.user.name)
    }
  }
</script>

<style>
  #menu {
    background: #fff;
    margin: 0 0 10px;
    border: solid 1px #e6e6e6;
    padding: 5px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  #menu img {
    width: 81px;
    margin-right: 50px;
  }
  .name {
    color: #ffffff;
    padding-right: 10px;
  }
  .nav-item {
    padding-right:15px;
  }
  .nav-item svg, a {
    color:white !important;
  }
</style>


<style scoped>

</style>
