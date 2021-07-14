<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else class="container">
    <b-card
      v-for="project in user.allProjects"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      class="card"
    >
      <h3>{{project.name}}</h3>
      <b-card-text>
        {{project.description}}
      </b-card-text>

      <b-button href="#" variant="primary">Open Project</b-button>
    </b-card>
  </div>
</template>

<script>
import LoadingSpinner  from '../components/LoadingSpinner.vue';

export default {
    components: {
        LoadingSpinner
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        isLoading() {
            return this.$store.state.user.isLoading;
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .card {
    width: 30%;
    margin: 1%;
  }
}
</style>
