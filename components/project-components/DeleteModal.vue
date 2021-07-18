<template>
  <div>
    <p>Are you sure?</p>
    <b-button
      v-if="!isLoading"
      type="submit"
      variant="outline-primary"
      @click="deleteProject(project.projectid)"
      >delete</b-button
    >
    <b-button v-if="isLoading" disabled variant="outline-primary">
      <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner
    ></b-button>
    <b-button variant="outline-primary" @click="toggleDeleteProjectModal"
      >Close
    </b-button>
  </div>
</template>

<script>
export default {
    props: ['deleteProject', 'toggleDeleteProjectModal', 'isLoading', 'project'],

}
</script>

<style lang="scss" scoped>
p {
  font-size: 1.6rem;
}
button {
  font-size: 1.6rem;
  margin-right: 1%;
}
</style>
