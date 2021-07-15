<template>
  <b-card class="card">
    <h2>{{ticket.title}}</h2>
    <h3>{{ticket.description}}</h3>
    <p>
      Created by {{ticket.ticketOwner.firstname}}
      {{ticket.ticketOwner.lastname}}
    </p>

    <div>
      <b-button variant="primary" @click="toggleCommentModal"
        >Add Comment</b-button
      >
      <b-button
        variant="primary"
        @click="toggleEditModal"
        v-if="user && Number(ticket.ticketOwner.userid) === Number(user.userid)"
        >Edit</b-button
      >
      <b-button
        variant="primary"
        @click="deleteTicket()"
        v-if="user && Number(ticket.ticketOwner.userid) === Number(user.userid)"
        >Delete</b-button
      >
    </div>
  </b-card>
</template>

<script>
import { axiosWithAuth } from '../util/axiosWithAuth.js';

export default {
    props: ['ticket', 'toggleEditModal', 'toggleCommentModal'],
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        async deleteTicket() {
                try {
                    await axiosWithAuth().delete(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id);
                    this.$router.push('/project/' + this.ticket.project.projectid);
                } catch (err) {
                    console.dir(err);
                }
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

  button {
    width: 15%;
    font-size: 1.4rem;
    margin: 1% 1% 1% 0;

    @media (max-width: 800px) {
      width: 20%;
    }

    @media (max-width: 600px) {
      font-size: 1.2rem;
      width: 30%;
    }
  }
}
</style>
