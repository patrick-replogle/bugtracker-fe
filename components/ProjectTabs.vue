<template>
  <b-tabs content-class="mt-3" class="tabs">
    <b-tab title="Tickets" class="tab">
      <b-list-group-item
        class="ticket"
        v-for="ticket in project.tickets"
        :key="ticket.ticketid"
      >
        <div>
          <p>
            {{ticket.title.length <= 110 ? ticket.title : ticket.title.slice(0, 110) + '...'}}
          </p>
          <p style="font-weight: bold;">{{map[ticket.priority]}} Priority</p>
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
    </b-tab>

    <b-tab title="Users" class="tab">
      <b-list-group>
        <b-list-group-item
          class="d-flex align-items-center"
          v-for="user in project.users"
          :key="user.userid"
        >
          <b-avatar class="mr-3"></b-avatar>
          <span class="mr-auto"
            >{{user.firstname.slice(0, 1).toUpperCase()}}.
            {{user.lastname}}</span
          >
        </b-list-group-item>
      </b-list-group>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
    props: ['project'],
    data() {
      return {
        map: { 'LOW': 'Low', 'MEDIUM': 'Medium', 'HIGH': 'High'}
      }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        routeToTicket(id) {
          this.$router.push({
                name: 'ticket-id',
                params: {
                    id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs {
  font-size: 1.6rem;

  .tab {
    .ticket {
      display: flex;
      justify-content: space-between;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      button {
        font-size: 1.4rem;
        margin-top: 18%;

        @media (max-width: 600px) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
