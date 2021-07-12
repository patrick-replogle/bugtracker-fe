<template>
  <div class="content">
    <div>
      <UnauthenticedNav />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import UnauthenticedNav from '../components/UnauthenticedNav.vue'

export default {
  components: {
      UnauthenticedNav
  }
};
</script>

<style></style>
