<template>
  <div class="container">
    <b-card class="card">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="~/assets/img/software-development.jpg"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <h1 class="title">Bugtracker</h1>
            <b-card-text class="text">
              Bugtracker is a free web app designed to help you keep of track
              ongoing bugs, errors or issues in your software. Create new
              projects and add users to your team. Generate and assign tickets
              to teammates based on priority level. We help you keep track of
              the details, so you can focus on the big picture.
            </b-card-text>
            <p>Create a new account or login below.</p>
            <b-button
              type="submit"
              variant="outline-primary"
              @click="handleClick('/register')"
              >Register</b-button
            >
            <b-button
              type="reset"
              variant="primary"
              @click="handleClick('/login')"
              >Login</b-button
            >
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  layout: 'unauthenticated',
  methods: {
    handleClick: function(route) {
      this.$router.push(route)
    }
  }
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
    @media (max-width: 600px) {
      font-size: 2.5rem;
    }
  }

  .text {
    font-size: 1.6rem;
    margin: 3.5% 0;
    @media (max-width: 600px) {
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1.2rem;
  }

  button {
    width: 30%;
    font-size: 1.6rem;
    margin: 1%;

    @media (max-width: 600px) {
      font-size: 1.4rem;
      width: 45%;
    }
  }
}
</style>
