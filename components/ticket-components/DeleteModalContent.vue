<template>
  <div>
    <p>Are you sure?</p>
    <b-button
      v-if="!isLoading"
      variant="outline-primary"
      @click="deleteTicket(ticket.ticketid)"
      >Delete</b-button
    >
    <b-button v-if="isLoading" disabled variant="outline-primary">
      <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner
    ></b-button>
    <b-button variant="outline-primary" @click="toggleDeleteTicketModal"
      >Close
    </b-button>
  </div>
</template>

<script>
export default {
    props: ['deleteTicket', 'ticket', 'toggleDeleteTicketModal', 'isLoading']
}
</script>

<style lang="scss" scoped>
p {
  font-size: 1.6rem;
}

button {
  font-size: 1.6rem;
  margin-right: 1%;
  width: 30%;
}
</style>
