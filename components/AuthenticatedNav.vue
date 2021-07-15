<template>
  <b-nav class="nav">
    <div class="left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        class="icon"
      >
        <g fill="none">
          <path
            d="M5 9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a7 7 0 0 1-7 7v0a7 7 0 0 1-7-7V9z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 6v-.425c0-.981.384-1.96 1.326-2.238c1.525-.45 3.823-.45 5.348 0C15.616 3.615 16 4.594 16 5.575V6"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.5 7.5L22 4"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.5 7.5L2 4"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 18l-4 3"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 12H1.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.5 12H19"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 18l4 3"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 13v8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      <h3>Bugtracker</h3>
    </div>
    <div class="right">
      <b-nav-item to="/projects">Home</b-nav-item>
      <b-nav-item to="/createproject">Create</b-nav-item>
    </div>
  </b-nav>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        isLoading() {
            return this.$store.state.user.isLoading;
        }
    },
    async created() {
        await this.$store.dispatch('user/getInitialUserData');
    }
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 10px 50px;
  background: #082c40;
  color: white;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100vw;

  @media (max-width: 600px) {
    padding: 10px 20px;
  }

  .left {
    width: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 1%;
      margin-right: 2%;

      @media (max-width: 600px) {
        display: none;
      }
    }

    h3 {
      font-size: 2.5rem;

      @media (max-width: 600px) {
        font-size: 2rem;
      }
    }
  }

  .right {
    width: 60%;
    display: flex;
    justify-content: flex-end;

    a {
      color: white;
      text-decoration: none;
      font-size: 1.6rem;

      @media (max-width: 600px) {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
