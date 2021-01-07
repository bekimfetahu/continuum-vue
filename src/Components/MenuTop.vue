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
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "MenuTop",
    mounted() {
      console.log('menu created')
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
  .user {
    margin-top:8px;
    font-size: 16px;
    color: #ffffff;
  }
  .nav-item {
    padding-right:15px;
  }
  .nav-link {
    color:#e6e6e6!important;
    font-size: 16px;
  }
</style>


<style scoped>

</style>
