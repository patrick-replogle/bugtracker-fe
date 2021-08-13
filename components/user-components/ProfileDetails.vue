<template>
  <div class="card">
    <div class="rows">
      <p>Email</p>
      <p>{{ user.email }}</p>
    </div>
    <div class="rows">
      <p>Username</p>
      <p>{{ user.username }}</p>
    </div>
    <div class="rows">
      <p>First Name</p>
      <p>{{ user.firstname }}</p>
    </div>
    <div class="rows">
      <p>Last Name</p>
      <p>{{ user.lastname }}</p>
    </div>
    <div class="rows last" v-if="user.company">
      <p>Company</p>
      <p>{{ user.company }}</p>
    </div>
    <b-button
      variant="primary"
      @click="toggleEditModal"
      v-if="storeUser && user.userid === storeUser.userid"
      >Edit
    </b-button>
  </div>
</template>

<script>
export default {
  props: ["user", "toggleEditModal", "storeUser"]
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  border-radius: 10px;

  .rows {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    padding: 10px;
    margin-top: 0.3%;

    :first-child {
      font-weight: bold;
      color: black;
      width: 20%;
      @media (max-width: 600px) {
        width: 40%;
      }
    }
    :nth-child(2) {
      color: #6c757d;
      width: 80%;
      @media (max-width: 600px) {
        width: 60%;
      }
    }
    :nth-child(6) {
      border-bottom: none;
    }
  }
  .last {
    border-bottom: none;
  }
  button {
    width: 10%;
    font-size: 1.6rem;
    margin: 1% 0 2% 1.5%;

    @media (max-width: 600px) {
      width: 30%;
    }
  }
}
</style>
