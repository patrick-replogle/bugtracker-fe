<template>
  <div id="container">
    <div class="app">
      <AuthenticatedNav />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import AuthenticatedNav from '../components/other/AuthenticatedNav.vue'
import Footer from '../components/other/Footer.vue'

export default {
  components: {
      AuthenticatedNav,
      Footer
  }
};
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  min-height: 100vh;

  div {
    padding-bottom: 70px;
  }
}
</style>
