<template>
  <div class="content">
    <div>
      <AuthenticatedNav />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import AuthenticatedNav from '../components/AuthenticatedNav.vue'

export default {
  components: {
      AuthenticatedNav
  }
};
</script>

<style></style>
