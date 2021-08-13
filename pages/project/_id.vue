<template>
  <div>
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div v-else-if="!isLoading && !project">
      <NotFound />
    </div>
    <div v-else class="container">
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
          <DeleteModal
            :deleteProject="deleteProject"
            :toggleDeleteProjectModal="toggleDeleteProjectModal"
            :isLoading="isLoading"
            :project="project"
          />
        </b-modal>

        <b-modal ref="search-modal" hide-footer hide-header class="searchModal">
          <SearchUsers
            :project="project"
            :addUserToProject="addUserToProject"
            :toggleSearchModal="toggleSearchModal"
            :removeUser="removeUser"
            :addUser="addUser"
            :comparator="comparator"
          />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from "../../util/axiosWithAuth.js";
import { checkErrorStatus } from "../../util/functions";
import ProjectDetails from "../../components/project-components/ProjectDetails.vue";
import ProjectTabs from "../../components/project-components/ProjectTabs.vue";
import AddTicketForm from "../../components/project-components/AddTicketForm.vue";
import SearchUsers from "../../components/project-components/SearchUsers.vue";
import DeleteModal from "../../components/project-components/DeleteModal.vue";
import NotFound from '../../components/other/NotFound.vue';
import LoadingSpinner from '../../components/other/LoadingSpinner.vue';

export default {
  middleware: "auth",
  components: {
    ProjectDetails,
    ProjectTabs,
    AddTicketForm,
    SearchUsers,
    DeleteModal,
    NotFound,
    LoadingSpinner
  },
  data() {
    return {
      project: null,
      isLoading: false
    };
  },
  created() {
    this.isLoading = true;

    axiosWithAuth()
      .get(this.$config.baseURL + "/projects/project/" + this.$route.params.id)
      .then((res) => {
        this.isLoading = false;
        this.project = res.data;
        this.project.tickets.sort((a, b) => a.createddate - b.createddate);
        this.project.users.sort(this.comparator);
      })
      .catch((err) => {
        this.isLoading = false;
        console.dir(err);
        checkErrorStatus(err, this.$router);
      });
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    toggleModal() {
      this.$refs["modal"].toggle("#modal");
    },
    toggleDeleteProjectModal() {
      this.$refs["delete-modal"].toggle("#delete-modal");
    },
    toggleSearchModal() {
      this.$refs["search-modal"].toggle("#search-modal");
    },
    async deleteProject(id) {
      try {
        this.isLoading = true;
        await axiosWithAuth().delete(
          this.$config.baseURL + "/projects/project/" + id
        );
        this.$store.commit("user/removeProject", id);
        this.isLoading = false;
        this.$router.push("/dashboard");
      } catch (err) {
        console.dir(err);
        this.isLoading = false;
        checkErrorStatus(err, this.$router);
      }
    },
    addUserToProject(user) {
      this.project.users.push(user);
      this.project.users.sort(this.comparator);
    },
    removeUserFromProject(userid) {
      this.project.users = this.project.users.filter(
        (u) => u.userid !== userid
      );
    },
    async addUser(user) {
      try {
        await axiosWithAuth().post(
          this.$config.baseURL +
            `/users/user/${user.userid}/project/${this.project.projectid}`
        );
        this.addUserToProject(user);
      } catch (err) {
        console.dir(err);
      }
    },
    async removeUser(user) {
      try {
        await axiosWithAuth().delete(
          this.$config.baseURL +
            `/users/user/${user.userid}/project/${this.project.projectid}`
        );
        this.removeUserFromProject(user.userid);
        if (this.user.userid === user.userid) {
          this.$store.commit("user/removeProject", this.project.projectid);
          this.$router.push("/dashboard");
        }
      } catch (err) {
        console.dir(err);
      }
    },
    comparator(a, b) {
      if (a.lastname < b.lastname) return -1;
      if (a.lastname > b.lastname) return 1;
      if (a.firstname < b.firstname) return -1;
      if (a.firstname > b.firstname) return 1;
    }
  }
};
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
