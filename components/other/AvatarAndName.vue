<template>
  <div class="container">
    <img
      v-if="user.imageurl"
      :src="user.imageurl"
      alt="uploaded project avatar"
      class="avatar"
    />
    <b-avatar v-else class="avatar"></b-avatar>
    <div class="text">
      <span>{{ user.firstname }} {{ user.lastname }}</span>
      <span>{{ user.email }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  width: 100%;

  .avatar {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
  }

  .text {
    display: flex;
    flex-direction: column;
    margin-left: 2%;

    :first-child {
      font-size: 1.6rem;

      @media (max-width: 600px) {
        font-size: 1.4rem;
      }
    }

    :nth-child(2) {
      font-size: 1.4rem;
      @media (max-width: 600px) {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
