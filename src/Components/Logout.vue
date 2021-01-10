<template>
</template>

<script>

  export default {
    name:'logout',
    created() {
      console.log('login out')
      this.$store.dispatch('auth/destroyToken').then((response)=>{
        // this.$router.push({name:'login'})
      }).catch((error)=>{
        // this.$router.push({name:'login'})
      })
    }
  }
</script>


