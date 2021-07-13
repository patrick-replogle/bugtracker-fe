<template>
  <div class="container">
    <b-card class="card">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="https://picsum.photos/400/400/?image=20"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <h1 class="title">Bugtracker</h1>
            <b-card-text class="text">
              A web app designed to help you keep track of issues and bugs in
              your projects.
            </b-card-text>
            <button>Login</button>
            <button>Register</button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  layout: 'unauthenticated'
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  .card {
    width: 80%;
    margin-top: 5vh;
  }

  .title {
    font-size: 4rem;
  }

  .text {
    font-size: 1.6rem;
    margin-top: 5%;
  }
}
</style>
