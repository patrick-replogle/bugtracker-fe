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
      <h3>
        {{project.name.length <= 28 ? project.name : project.name.slice(0, 28)}}
      </h3>

      <p>Modified on {{generateDateString(project.lastmodifieddate)}}</p>

      <b-button variant="primary" @click="routeToProject(project.projectid)"
        >Open Project</b-button
      >
    </b-card>
  </div>
</template>

<script>
import LoadingSpinner  from '../components/LoadingSpinner.vue';
import { generateDateString } from '../util/functions'

export default {
    components: {
        LoadingSpinner
    },
    data() {
      return {
        generateDateString
      }
    },
    computed: {
        user() {
          console.log(this.$store.state.user.user)
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

    @media (max-width: 800px) {
      width: 45%;
    }

    @media (max-width: 600px) {
      width: 98%;
      margin: 1% 0;
    }

    h3 {
      font-size: 2rem;
      font-weight: bold;
    }

    p {
      font-size: 1.4rem;
    }

    button {
      font-size: 1.4rem;
    }
  }
}
</style>
