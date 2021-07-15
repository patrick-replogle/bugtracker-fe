<template>
  <b-card class="card">
    <p v-if="ticket.completed" class="completedText">
      This Ticket Has Been Completed
    </p>
    <h2>{{ticket.title}}</h2>
    <h3>{{ticket.description}}</h3>
    <p v-bind:style="priorityStyle" class="priorityP">
      {{map[ticket.priority]}} Priority
    </p>
    <p style="font-size: 1.2rem;">
      Created by {{ticket.ticketOwner.firstname.slice(0, 1).toUpperCase()}}.
      {{ticket.ticketOwner.lastname}} on
      {{generateDateString(ticket.createddate)}}
    </p>

    <p v-if="!ticket.assignedUser" style="font-weight: bold;">
      No one is currently assigned to this ticket
    </p>
    <p v-if="ticket.assignedUser" style="font-weight: bold;">
      {{ticket.assignedUser.firstname}} {{ticket.assignedUser.lastname}} is
      assigned to this ticket
    </p>

    <div>
      <b-button variant="primary" @click="toggleCommentModal"
        >Add Comment</b-button
      >
      <b-button variant="primary" @click="toggleEditModal">Edit</b-button>
      <b-button variant="primary" @click="deleteTicket">Delete</b-button>
      <b-button variant="primary" @click="assignUser">Assign Yourself</b-button>
      <b-button variant="primary" @click="markCompleted"
        >Mark Completed</b-button
      >
    </div>
  </b-card>
</template>

<script>
import { axiosWithAuth } from '../util/axiosWithAuth.js';
import { generateDateString, generateMinimumUserFields, checkErrorStatus } from '../util/functions';

export default {
    props: ['ticket', 'toggleEditModal', 'toggleCommentModal', 'setTicket'],
    data() {
      return {
        generateDateString,
         map: { 'LOW': 'Low', 'MEDIUM': 'Medium', 'HIGH': 'High'},
      }
    },
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
              checkErrorStatus(err, this.$router);
          }
        },
        async assignUser() {

          const assignedUser = { assignedUser: generateMinimumUserFields(this.$store.state.user.user)};
          try {
            await axiosWithAuth().patch(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id, assignedUser);
            this.setTicket(assignedUser);
          } catch (err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
          }
        },
        async markCompleted() {
          const body = { completed: true };
          try {
            await axiosWithAuth().patch(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id, body);
            this.setTicket(body);
          } catch (err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
          }
        }
    },
    computed: {
      priorityStyle() {
        if (this.ticket.priority === 'HIGH' ) {
          return {'background-color': '#dc3545', color: 'white'}
        } else if (this.ticket.priority === 'LOW') {
          return {'background-color': '#28a745', color: 'white'}
        } else {
          return {'background-color': '#ffc107', color: 'black'}
        }
      }
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

  .completedText {
    background-color: #28a745;
    color: white;
    padding: 10px;
    margin-top: -10px;
    text-align: center;
    font-size: 1.6rem;
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

  .priorityP {
    padding: 10px;
    display: inline-block;
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
