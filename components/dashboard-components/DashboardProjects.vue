<template>
  <div>
    <div class="cardContainer">
      <p v-if="user.allProjects.length === 0">
        You have no active projects at this time
      </p>
      <b-card
        v-for="project in user.allProjects"
        tag="article"
        class="card"
        :key="project.projectid"
      >
        <img
          v-if="project.imageurl"
          :src="project.imageurl"
          alt="uploaded project avatar"
        />
        <img
          v-else
          src="~/assets/img/placeholder.jpg"
          alt="stock project avatar"
        />
        <h3>
          {{
            project.name.length <= 28
              ? project.name
              : project.name.slice(0, 28) + "..."
          }}
        </h3>

        <p>Modified on {{ generateDateString(project.lastmodifieddate) }}</p>

        <b-button variant="primary" @click="routeToProject(project.projectid)"
          >Open Project</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import { generateDateString } from "../../util/functions";

export default {
  data() {
    return {
      generateDateString,
      imagePlaceholder: "~/assets/img/placeholder.jpg"
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  methods: {
    routeToProject(id) {
      this.$router.push(`/project/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.cardContainer {
  display: flex;
  flex-wrap: wrap;

  .card {
    width: 31%;
    margin: 1%;
    border-radius: 6px;

    @media (max-width: 1000px) {
      width: 45%;
    }

    @media (max-width: 600px) {
      width: 98%;
      margin: 1% 0;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      margin-bottom: 2%;
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
