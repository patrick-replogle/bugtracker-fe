<template>
  <b-card class="card">
    <h2>{{project.name}}</h2>
    <h3>{{project.description}}</h3>
    <p>
      Created by {{project.projectOwner.firstname}}
      {{project.projectOwner.lastname}}
    </p>

    <a
      v-if="project.repositoryurl"
      v-bind:href="project.repositoryurl"
      class="card-link"
      target="_blank"
      >Repository URL
    </a>
    <a
      v-if="project.websiteurl"
      v-bind:href="project.websiteurl"
      class="card-link"
      target="_blank"
      >Deployed URL
    </a>
    <div>
      <b-button variant="primary" @click="toggleModal">Create Ticket</b-button>
      <b-button variant="primary">Add User</b-button>
      <b-button
        variant="primary"
        @click="editProject(project)"
        v-if="user && Number(project.projectOwner.userid) === Number(user.userid)"
        >Edit</b-button
      >
      <b-button
        variant="primary"
        @click="deleteProject(project.projectid)"
        v-if="user && Number(project.projectOwner.userid) === Number(user.userid)"
        >Delete</b-button
      >
    </div>
  </b-card>
</template>

<script>
export default {
    props: ['project', 'toggleModal'],
    computed: {
      user() {
          return this.$store.state.user.user;
      },
    },
    methods: {
      deleteProject(id) {
          this.$store.dispatch('user/deleteProject', id);
      },
      editProject(payload) {
          this.$store.commit('user/toggleProjectEdit', payload);
          this.$router.push('/createproject');
      },
    }
}
</script>

<style lang="scss" scoped>
.card {
  h2,
  h3,
  p {
    margin: 1.5% 0;

    @media (max-width: 600px) {
      margin: 3% 0;
    }
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1.4rem;
  }

  a {
    font-size: 1.4rem;
  }

  button {
    width: 15%;
    font-size: 1.4rem;
    margin: 1% 1% 1% 0;

    @media (max-width: 600px) {
      width: 40%;
    }
  }
}
</style>
