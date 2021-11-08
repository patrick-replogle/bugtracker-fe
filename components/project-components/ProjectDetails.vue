<template>
  <b-card class="card">
    <!-- <img
      v-if="project.imageurl"
      :src="project.imageurl"
      alt="uploaded project avatar"
    /> -->
    <h2>{{project.name}}</h2>
    <h3>{{project.description}}</h3>
    <div style="display: flex; align-items: center; margin-top: -1%;">
      <p>Created by&nbsp;
      <p @click="routeToUser(user.userid)" style="cursor: pointer;">{{project.projectOwner.firstname}}
        {{project.projectOwner.lastname}}</p> &nbsp;
        <p class="hide">on {{generateDateString(project.createddate)}}</p>
      </p>
    </div>

    <a
      v-if="project.repositoryurl"
      v-bind:href="project.repositoryurl"
      class="card-link"
      target="_blank"
      >View Code
    </a>
    <a
      v-if="project.websiteurl"
      v-bind:href="project.websiteurl"
      class="card-link"
      target="_blank"
      >View Website
    </a>

    <div v-if="user && project.users.find(u => u.userid === user.userid)">
      <b-button variant="primary" @click="toggleModal">Create Ticket</b-button>
      <b-button
        variant="primary"
        v-if="user && project.projectOwner.userid === user.userid"
        @click="toggleSearchModal"
        >Add User</b-button
      >
      <b-button
        variant="primary"
        @click="editProject(project)"
        v-if="user && project.projectOwner.userid === user.userid"
        >Edit</b-button
      >
      <b-button
        variant="primary"
        @click="toggleDeleteProjectModal"
        v-if="user && project.projectOwner.userid === user.userid"
        >Delete</b-button
      >
      <b-button
        variant="primary"
        @click="toggleRemoveYourselfModal"
        v-if="user && project.projectOwner.userid !== user.userid"
        >Remove Yourself</b-button
      >
    </div>

    <b-modal ref="remove-modal" hide-footer class="removeModal">
      <p style="font-size: 1.4rem;">
        Are you sure you want to remove yourself from this project? The project
        creator will have to invite you back if you remove yourself.
      </p>
      <b-button
        variant="primary"
        @click="handleRemoveUser(user)"
        style="font-size: 1.6rem;"
        >Proceed</b-button
      >
      <b-button
        variant="outline-primary"
        @click="toggleRemoveYourselfModal"
        style="font-size: 1.6rem;"
        >Cancel</b-button
      >
    </b-modal>
  </b-card>
</template>

<script>
import { generateDateString } from '../../util/functions';

export default {
    data() {
      return {
        generateDateString
      }
    },
    props: ['project', 'toggleModal', 'toggleDeleteProjectModal', 'toggleSearchModal', 'removeUser'],
    computed: {
      user() {
          return this.$store.state.user.user;
      },
    },
    methods: {
      editProject(payload) {
          this.$store.commit('user/toggleProjectEdit', payload);
          this.$router.push('/createproject');
      },
      toggleRemoveYourselfModal() {
        this.$refs['remove-modal'].toggle('#remove-modal');
      },
      handleRemoveUser() {
        this.removeUser(this.user);
        this.toggleRemoveYourselfModal();
      },
      routeToUser(id) {
        this.$router.push(`/user/${id}`);
      }
    }
}
</script>

<style lang="scss" scoped>
.card, h2, h3, p {
    margin: 1.5% 0;

    @media (max-width: 600px) {
      margin: 3% 0;
    }
}
.card {
  margin-top: 2%;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
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

  .hide {
    @media (max-width: 600px) {
      display: none;
    }
  }

  button {
    width: 18%;
    font-size: 1.4rem;
    margin: 1% 1% 1% 0;

    @media (max-width: 800px) {
      width: 25%;
    }

    @media (max-width: 600px) {
      width: 100%;
      font-size: 1.2rem;
      margin: 2% 0;
    }
  }
}
</style>
