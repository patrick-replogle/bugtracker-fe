<template>
  <div class="container">
    <div v-if="project" class="card" id="modal">
      <ProjectDetails :project="project" :toggleModal="toggleModal" />
    </div>
    <div v-if="project" class="tabContainer">
      <ProjectTabs :project="project" />

      <b-modal ref="modal" title="Create a ticket" hide-footer>
        <AddTicketForm :toggleModal="toggleModal" :project="project" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { checkErrorStatus } from '../../util/functions';
import ProjectDetails from '../../components/ProjectDetails.vue';
import ProjectTabs from '../../components/ProjectTabs.vue';
import AddTicketForm from '../../components/AddTicketForm.vue'

export default {
  components: {
    ProjectDetails,
    ProjectTabs,
    AddTicketForm
  },
  data() {
    return {
        project: null,
        isLoading: false,
        showModal: false,
    }
  },
  created() {
      axiosWithAuth().get(this.$config.baseURL + '/projects/project/' + this.$route.params.id)
          .then(res => this.project = res.data)
          .catch(err => {
            console.dir(err);
            checkErrorStatus(err, this.$router);
          })
  },
  computed: {
      user() {
          return this.$store.state.user.user;
      },
  },
  methods: {
      toggleModal() {
        this.$refs['modal'].toggle('#modal');
      },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 2%;

  .card,
  .tabContainer {
    width: 100%;
  }
}
</style>
