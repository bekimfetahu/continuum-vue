<template>
  <div id="app">
    <div id="content-wrapper">
      <div class="container">
        <menu-top></menu-top>
        <div class="box" style="min-height: 700px">
          <div class="row">
            <div class="col-lg-12">
              <transition name="fade">
                <router-view :key="$route.fullPath"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuTop from "../Components/MenuTop";
  export default {
    name: "master",
    components: {
      MenuTop
    },
    created() {
      console.log('SERVER: ' + process.env.SERVER_API)
    }
  }
</script>

<style lang="scss">

  $theme-color: #993366;

  #app {
    font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
    font-size: 1.1rem;
    line-height: 1.5;
	  min-height: 740px;
  }

  #content-wrapper {
    padding: 5px;
  }

  .box-title {
    display: block;
    border-bottom: 2px solid #ced4da;
    padding-bottom: 5px;
    color: $theme-color;
    margin-bottom: 25px !important;
  }

  .container h3 {
    color: #4d4d4d;
    margin: 15px 0 5px 0;
  }

  .container .box {
    margin: 0 0 10px;
    border: solid 1px #e6e6e6;
    padding: 15px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .center-align {
    margin: 0 auto;
    width: 70%;
  }

  @media (max-width: 767.98px) {
    .container .box .content {
      min-height: 100px;
    }
  }

  @media (min-width: 1200px) {
    .container .box .content {
      min-height: 500px;
    }
  }
</style>
