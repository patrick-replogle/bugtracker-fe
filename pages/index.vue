<template>
  <!-- <div class="container">
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
  </div> -->
  <div class="wrapper">
    <div class="card">
      <div class="left"> 
        <img
          src="~/assets/img/software-development.jpg"
          alt="Image"
          class="rounded-0"
        />
      </div>
      <div class="right">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "unauthenticated",
  methods: {
    handleClick: function (route) {
      this.$router.push(route);
    }
  },
  created() {
    axios
      .get(this.$config.baseURL + "/wakeup/heroku")
      .then(() => {
        console.log("server awake");
      })
      .catch((err) => {
        console.dir(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;

  .card {
    display: flex;
    flex-direction: row;
    width: 95%;
    max-width: 1100px;
    margin-top: 5vh;
    @media (max-width: 800px) {
      flex-direction: column;
      margin-top: 2vh;
    }

    .left {
      width: 50%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      @media (max-width: 800px) {
        width: 100%;
      }
      img {
        object-fit: cover;
        width: 100%;
        max-height: 310px;
        min-height: 310px;
        @media (max-width: 940px) {
          max-height: 380px;
          min-height: 380px;
        }
        @media (max-width: 600px) {
          max-height: 260px;
          min-height: 260px;
        }
      }
    }

    .right {
      width: 50%;
      padding: 10px;
      line-height: 1.6;
      margin-top: 10px;
      @media (max-width: 800px) {
        width: 100%;
        margin-top: 0;
      }
      @media (max-width: 600px) {
        line-height: 1.4;
      }
      .title {
        font-size: 4rem;
        font-weight: bold;
        @media (max-width: 800px) {
          font-size: 2.5rem;
        }
      }

      .text {
        font-size: 1.6rem;
        margin: 3.5% 0;
        @media (max-width: 800px) {
          margin: 2% 0 3% 0;
        }
      }

      p {
        font-size: 1.4rem;
      }

      button {
        width: 46%;
        font-size: 1.6rem;
        margin-right: 1%;
      }
    }
  }
}
</style>