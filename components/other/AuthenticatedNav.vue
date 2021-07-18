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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1024 1024"
        class="icon"
        @click="routeToDashboard"
      >
        <path
          d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7l23.1 23.1L882 542.3h-96.1z"
          fill="white"
        />
      </svg>
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
        @click="routeToForm"
      >
        <path
          d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"
          fill="white"
        />
      </svg>
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
        @click="routeToProfile"
      >
        <g fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21z"
            fill="white"
          />
        </g>
      </svg>
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
        @click="logout"
      >
        <path
          d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4l5-4v3z"
          fill="white"
        />
      </svg>
    </div>
  </b-nav>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';

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
    },
    methods: {
        async logout() {
            try {
              await axiosWithAuth().get(this.$config.baseURL + '/logout');
              if (process.client) {
                localStorage.clear();
              }
              this.$router.push('/login')
            } catch (err) {
              console.dir(err);
            }
        },
        routeToDashboard() {
          this.$router.push('/dashboard');
        },
        routeToForm() {
          this.$router.push('/createproject');
        },
        routeToProfile() {
          this.$router.push(`/user/${this.user.userid}`);
        }
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
    padding: 10px;
  }

  .left {
    width: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 600px) {
      width: 30%;
    }

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
        font-size: 1.8rem;
      }
    }
  }

  .right {
    width: 60%;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 600px) {
      width: 70%;
    }

    .icon {
      font-size: 3rem;
      cursor: pointer;
      margin-left: 8%;

      @media (max-width: 600px) {
        font-size: 2rem;
        margin-left: 15%;
        margin-bottom: 3%;
      }
    }
  }
}
</style>
