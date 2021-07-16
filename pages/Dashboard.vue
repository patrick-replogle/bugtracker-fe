<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else class="container">
    <b-tabs content-class="mt-3" class="tabs">
      <b-tab title="Projects" class="tab">
        <DashboardProjects />
      </b-tab>

      <b-tab title="Assigned Tickets" class="tab">
        <DashboardTickets />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import LoadingSpinner  from '../components/other/LoadingSpinner.vue';
import DashboardProjects from '../components/dashboard-components/DashboardProjects.vue';
import DashboardTickets from '../components/dashboard-components/DashboardTickets.vue';

export default {
    middleware: "auth",
    components: {
        LoadingSpinner,
        DashboardProjects,
        DashboardTickets
    },

    computed: {
        isLoading() {
            return this.$store.state.user.isLoading;
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 1%;

  .tabs {
    font-size: 1.6rem;

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
        margin-top: 25%;

        @media (max-width: 600px) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
