<template>
  <div class="container">
    <div v-if="project" class="card" id="modal">
      <ProjectDetails
        :project="project"
        :toggleModal="toggleModal"
        :toggleDeleteProjectModal="toggleDeleteProjectModal"
      />
    </div>
    <div v-if="project" class="tabContainer">
      <ProjectTabs :project="project" />

      <b-modal ref="modal" title="Create a ticket" hide-footer>
        <AddTicketForm :toggleModal="toggleModal" :project="project" />
      </b-modal>

      <b-modal ref="delete-modal" hide-footer class="deleteModal">
        <p>Are you sure?</p>
        <b-button
          variant="outline-primary"
          @click="deleteProject(project.projectid)"
          >Delete
        </b-button>
        <b-button variant="outline-primary" @click="toggleDeleteProjectModal"
          >Close
        </b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { checkErrorStatus } from '../../util/functions';
import ProjectDetails from '../../components/project-components/ProjectDetails.vue';
import ProjectTabs from '../../components/project-components/ProjectTabs.vue';
import AddTicketForm from '../../components/project-components/AddTicketForm.vue'

export default {
   middleware: "auth",
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
      toggleDeleteProjectModal() {
        this.$refs['delete-modal'].toggle('#delete-modal');
      },
      deleteProject(id) {
        this.$store.dispatch('user/deleteProject', id);
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

p {
  font-size: 1.6rem;
}
button {
  font-size: 1.6rem;
  margin-right: 1%;
}
</style>
