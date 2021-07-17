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

    <nuxt-link :to="`/project/${ticket.project.projectid}`">
      Full Project Details
    </nuxt-link>

    <p v-if="!ticket.assignedUser" style="font-weight: bold;">
      No one is currently assigned to this ticket
    </p>

    <div style="display: flex;">
      <p v-if="ticket.assignedUser" style="font-weight: bold;">
        {{ticket.assignedUser.firstname}}
        {{ticket.assignedUser.lastname}} <p style="font-weight: normal;"> &nbsp;is assigned this ticket</p>
      </p>
    </div>

    <div>
      <b-button variant="primary" @click="toggleCommentModal"
        >Add Comment</b-button
      >
      <b-button variant="primary" @click="toggleEditModal">Edit</b-button>
       <b-button variant="primary" @click="toggleAssignUserModal">Assign Ticket</b-button>
      <b-button
        v-if="!ticket.completed"
        variant="primary"
        @click="markCompleted"
        >Mark Completed
      </b-button>
      <b-button v-if="ticket.completed" variant="primary" @click="reopenTicket"
        >Reopen Ticket
      </b-button>
      <b-button variant="primary" @click="toggleDeleteTicketModal"
        >Delete</b-button
      >
    </div>
  </b-card>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { generateDateString, generateMinimumUserFields, checkErrorStatus } from '../../util/functions';

export default {
    props: ['ticket', 'toggleEditModal', 'toggleCommentModal', 'setTicket', 'toggleDeleteTicketModal', 'toggleAssignUserModal'],
    data() {
      return {
        generateDateString,
         map: { 'LOW': 'Low', 'MEDIUM': 'Medium', 'HIGH': 'High'},
         isLoading: false
      }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        async markCompleted() {
          const body = { completed: true };
          try {
            await axiosWithAuth().patch(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id, body);
            this.setTicket(body);
            this.$store.commit('user/updateTicket', {...this.ticket, ...body })
          } catch (err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
          }
        },
        async reopenTicket() {
          const body = { completed: false };
          try {
            await axiosWithAuth().patch(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id, body);
            this.setTicket(body);
            this.$store.commit('user/updateTicket', {...this.ticket, ...body })
          } catch (err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
          }
        },
        pushToProject(id) {
          this.$router.push(`/project/${id}`);
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
    },
}
</script>

<style lang="scss" scoped>
.card,
h2,
h3,
p {
  margin: 1.5% 0;
}
.card {
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    margin: 3% 0;
  }

  a {
    font-size: 1.6rem;
    display: block;
  }

  .completedText {
    background-color: #6c757d;
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
    width: 18%;
    font-size: 1.4rem;
    margin: 1% 1% 1% 0;

    @media (max-width: 900px) {
      width:30%;
    }

    @media (max-width: 600px) {
      width: 100%;
      font-size: 1.2rem;
      margin: 2% 0;
    }
  }
}
</style>
