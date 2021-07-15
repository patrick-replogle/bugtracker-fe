<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else class="container">
    <b-card
      v-for="project in user.allProjects"
      img-src="~/assets/img/placeholder.jpg"
      img-alt="Image"
      img-top
      tag="article"
      class="card"
      :key="project.projectid"
    >
      <img />
      <h3>{{project.name}}</h3>
      <b-card-text>
        {{project.description}}
      </b-card-text>

      <b-button
        href="#"
        variant="primary"
        @click="routeToProject(project.projectid)"
        >Open Project</b-button
      >
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
    methods: {
        routeToProject(id) {
            this.$router.push({
                name: 'project-id',
                params: {
                    id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2%;

  .card {
    width: 30%;
    margin: 1%;

    @media (max-width: 600px) {
      width: 95%;
      margin: 1% 0;
    }
  }
}
</style>
