<template>
  <div>
    <p v-if="user.assignedTickets.length === 0">
      You have no assigned tickets at this time.
    </p>
    <b-list-group-item
      class="ticket"
      v-for="ticket in user.assignedTickets"
      :key="ticket.ticketid"
    >
      <div>
        <p>
          {{ticket.title.length <= 110 ? ticket.title : ticket.title.slice(0, 110) + '...'}}
        </p>
        <p style="font-weight: bold;">
          {{map[ticket.priority]}} Priority
          <svg
            v-if="ticket.completed"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            width="2em"
            height="2em"
            style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 12 12"
          >
            <g fill="none">
              <path
                d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6zm7.354-.896a.5.5 0 1 0-.708-.708L5.5 6.543L4.354 5.396a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l2.5-2.5z"
                fill="#28a745"
              />
            </g>
          </svg>
        </p>

        <div style="display: flex; font-size: 1.4rem;">
          <p>
          Created by&nbsp;
          <p style="cursor: pointer;" @click="routeToUser(ticket.ticketOwner.userid)">
          {{ticket.ticketOwner.firstname}} {{ticket.ticketOwner.lastname}}</p>&nbsp;on
          {{generateDateString(ticket.createddate)}}</p>
        </div>

        <nuxt-link :to="`/project/${ticket.project.projectid}`">
          View Project Details
        </nuxt-link>
      </div>

      <div>
        <b-button
          variant="success"
          v-if="ticket.priority ==='LOW'"
          @click="routeToTicket(ticket.ticketid)"
          >View Details</b-button
        >
        <b-button
          variant="warning"
          v-else-if="ticket.priority ==='MEDIUM'"
          @click="routeToTicket(ticket.ticketid)"
          >View Details</b-button
        >
        <b-button
          variant="danger"
          v-else
          @click="routeToTicket(ticket.ticketid)"
          >View Details</b-button
        >
      </div>
    </b-list-group-item>
  </div>
</template>

<script>
import { generateDateString } from '../../util/functions';

export default {
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
        routeToTicket(id) {
          this.$router.push(`/ticket/${id}`)
        },
        routeToUser(id) {
          this.$router.push(`/user/${id}`);
        }
    }
}
</script>

<style lang="scss" scoped>
.ticket {
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 1% 0;
  border-radius: 6px;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  button {
    font-size: 1.4rem;
    margin-top: 45%;

    @media (max-width: 600px) {
      margin-top: 2%;
    }
  }
}
</style>
