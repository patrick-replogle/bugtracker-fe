<template>
  <div>
    <div v-if="project">
      <b-card class="card">
        <h2>{{project.name}}</h2>
        <b-card-text>
          {{project.description}}
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a
          v-if="project.repositoryurl"
          v-bind:href="project.repositoryurl"
          class="card-link"
          target="_blank"
          >Repository URL
        </a>
        <a
          v-if="project.deployedurl"
          v-bind:href="project.deployedurl"
          class="card-link"
          target="_blank"
          >Deployed URL
        </a>
        <div
          v-if="user && Number(project.projectOwner.userid) === Number(user.userid)"
        >
          <b-button variant="primary" @click="editProject(project)"
            >Edit</b-button
          >
          <b-button variant="primary" @click="deleteProject(project.projectid)"
            >Delete</b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth';

export default {
    data() {
        return {
            project: null,
            isLoading: false
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
        deleteProject(id) {
            this.$store.dispatch('user/deleteProject', id);
        },
        editProject(payload) {
            this.$store.commit('user/toggleEdit', payload);
            this.$router.push('/createproject')
        }
    }
}
</script>

<style lang="scss" scoped></style>
