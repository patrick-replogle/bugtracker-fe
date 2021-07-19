<template>
  <div class="projectContainer" v-if="user.allProjects.length > 0">
    <p>Projects</p>
    <b-list-group-item
      v-for="project in user.allProjects"
      :key="project.projectid"
      class="project"
    >
      <h3 @click="routeToProject(project.projectid)">{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <a href="" target="_blank" v-if="project.repositoryurl">View Code</a>
      <a href="" target="_blank" v-if="project.websiteurl">View Website</a>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    routeToProject(id) {
      this.$router.push(`/project/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.projectContainer {
  margin-top: 2%;

  p {
    font-size: 1.6rem;
    color: #6c757d;
    font-weight: bold;
  }

  .project {
    margin: 1% 0;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.6rem;

    h3 {
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 1%;
    }

    p {
      font-size: 1.4rem;
      font-weight: normal;
      color: black;
    }

    a {
      margin-right: 2%;
      font-size: 1.4rem;
    }
  }
}
</style>
