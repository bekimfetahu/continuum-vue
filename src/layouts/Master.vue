<template>
  <div id="app">
		<router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>


  export default {
    name: "master",
    components: {
    },
    created() {
      console.log('SERVER: ' + process.env.SERVER_API)
    }
  }
</script>

<style lang="scss">

  $body-bg: #17a2b8;
  $theme-color: #993366;

  #app {
    font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
    font-size: 1.1rem;
    line-height: 1.5;
	min-height: 840px;
  }

  #content-wrapper {
    background-position: bottom;
    background-attachment: fixed;
    background-repeat: no-repeat;
    padding: 10px;
    min-height: 840px;
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
    background: #fff;
    margin: 0 0 10px;
    border: solid 1px #e6e6e6;
    padding: 15px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
