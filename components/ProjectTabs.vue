<template>
  <b-tabs content-class="mt-3" class="tabs">
    <b-tab title="Tickets" class="tab">
      <div v-for="ticket in project.tickets">{{ticket.title}}</div>
      <p v-if="project.tickets.length === 0" :key="project.tickets.ticketid">
        There are no active tickets at this time
      </p>
    </b-tab>
    <b-tab title="Users" class="tab"
      ><p>
        <b-list-group style="max-width: 300px;">
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
      </p></b-tab
    >
  </b-tabs>
</template>

<script>
export default {
    props: ['project'],
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
}
</script>

<style lang="scss" scoped>
.tabs {
  font-size: 1.6rem;
}
</style>
