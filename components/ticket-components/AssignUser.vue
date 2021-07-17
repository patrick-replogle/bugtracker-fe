<template>
  <b-list-group style="width: 100%;" v-if="ticket">
    <ModalHeader
      text="Assign a user to this ticket"
      :toggle="toggleAssignUserModal"
    />
    <b-list-group-item
      class="user"
      v-for="u in ticket.project.users"
      :key="u.userid"
      style="cursor: pointer;"
      @click="handleClick(u)"
    >
      <div style="display: flex; align-items: center;">
        <b-avatar class="mr-3"></b-avatar>
        <div style="display: flex; flex-direction: column;">
          <span style="font-size: 1.6rem;">{{u.firstname}} {{u.lastname}}</span>
          <span style="font-size: 1.4rem;">{{u.email}}</span>
        </div>
      </div>

      <svg
        v-if="ticket.assignedUser && u.userid === ticket.assignedUser.userid"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="2em"
        height="2em"
        style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 12 12"
        class="icon"
      >
        <g fill="none">
          <path
            d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6zm7.354-.896a.5.5 0 1 0-.708-.708L5.5 6.543L4.354 5.396a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l2.5-2.5z"
            fill="#28a745"
          />
        </g>
      </svg>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import ModalHeader from '../other/ModalHeader.vue';

export default {
    components: {
        ModalHeader
    },
    props: ['assignUser', 'ticket', 'toggleAssignUserModal', 'unassignUser'],
    methods: {
      handleClick(user) {
        if (!this.ticket.assignedUser || this.ticket.assignedUser.userid !== user.userid) {
          return this.assignUser(user);
        }
        return this.unassignUser(user);
      }
    }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 1% 0;
  border-radius: 6px;

  .icon {
    font-size: 2rem;
    margin-top: 1%;
    cursor: pointer;

    @media (max-width: 600px) {
      font-size: 1.6rem;
      margin-top: 3%;
    }

    &:hover {
      filter: brightness(0.5);
    }
  }
}
</style>
