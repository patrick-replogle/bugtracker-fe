<template>
  <div class="container">
    <div v-if="project" class="card" id="modal">
      <ProjectDetails :project="project" :toggleModal="toggleModal" />
      <ProjectTabs :project="project" />

      <b-modal ref="modal" title="Create a ticket" hide-footer>
        <AddTicketForm :toggleModal="toggleModal" :project="project" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
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
          .catch(err => console.dir(err))
  },
  computed: {
      user() {
          return this.$store.state.user.user;
      },
  },
  methods: {
      toggleModal() {
        this.$refs['modal'].toggle('#modal');
      }
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2%;

  .card {
    width: 100%;
  }
}
</style>
