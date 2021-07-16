<template>
  <div>
    <div class="cardContainer">
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
  </div>
</template>

<script>
import { generateDateString } from '../../util/functions';

export default {
    data() {
        return {
            generateDateString
        }
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
            this.$router.push(`/project/${id}`)
        },
    }
}
</script>

<style lang="scss" scoped>
.cardContainer {
  display: flex;
  flex-wrap: wrap;

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
      font-size: 1.8rem;
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
