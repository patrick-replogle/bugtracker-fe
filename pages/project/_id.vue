<template>
  <div class="container">
    <div v-if="project" class="card" id="modal">
      <ProjectDetails
        :project="project"
        :toggleModal="toggleModal"
        :toggleDeleteProjectModal="toggleDeleteProjectModal"
        :toggleSearchModal="toggleSearchModal"
        :removeUser="removeUser"
      />
    </div>
    <div v-if="project" class="tabContainer">
      <ProjectTabs
        :project="project"
        :removeUserFromProject="removeUserFromProject"
      />

      <b-modal ref="modal" title="Create a ticket" hide-footer>
        <AddTicketForm :toggleModal="toggleModal" :project="project" />
      </b-modal>

      <b-modal ref="delete-modal" hide-footer hide-header class="deleteModal">
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

      <b-modal ref="search-modal" hide-footer hide-header class="searchModal">
        <SearchUsers
          :project="project"
          :addUserToProject="addUserToProject"
          :toggleSearchModal="toggleSearchModal"
          :removeUser="removeUser"
          :addUser="addUser"
        />
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
import SearchUsers from '../../components/project-components/SearchUsers.vue';

export default {
   middleware: "auth",
  components: {
    ProjectDetails,
    ProjectTabs,
    AddTicketForm,
    SearchUsers
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
      toggleSearchModal() {
        this.$refs['search-modal'].toggle('#search-modal');
      },
      deleteProject(id) {
        this.$store.dispatch('user/deleteProject', id);
      },
      addUserToProject(user) {
        this.project.users.push(user);
      },
      removeUserFromProject(userid) {
        this.project.users = this.project.users.filter(u => u.userid !== userid);
      },
      async addUser(user) {
          try {
              await axiosWithAuth().post(this.$config.baseURL + `/users/user/${user.userid}/project/${this.project.projectid}`);
              this.addUserToProject(user);
          } catch (err) {
              console.dir(err);
          }
      },
      async removeUser(user) {
          try {
              await axiosWithAuth().delete(this.$config.baseURL + `/users/user/${user.userid}/project/${this.project.projectid}`);
              this.removeUserFromProject(user.userid);
              if (this.user.userid === user.userid) {
                this.$store.commit('user/removeProject', this.project.projectid);
              }
          } catch (err) {
              console.dir(err);
          }
      }
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
