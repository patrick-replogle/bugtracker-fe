<template>
  <div>
    <p>Are you sure?</p>
    <b-button variant="outline-primary" @click="deleteTicket(ticket.ticketid)"
      >Delete
    </b-button>
    <b-button variant="outline-primary" @click="toggleDeleteTicketModal"
      >Close
    </b-button>
  </div>
</template>

<script>
export default {
    props: ['deleteTicket', 'ticket']
}
</script>

<style lang="scss" scoped>
p {
  font-size: 1.6rem;
}

button {
  font-size: 1.6rem;
  margin-right: 1%;
}
</style>
