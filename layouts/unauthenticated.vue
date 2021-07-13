<template>
  <div id="container">
    <div>
      <UnauthenticedNav />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import UnauthenticedNav from '../components/UnauthenticedNav.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
      UnauthenticedNav,
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
