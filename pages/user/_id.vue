<template>
  <div class="container" v-if="user">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
      class="icon"
    >
      <defs />
      <path
        d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24zM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8zM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0z"
        fill="#626262"
      />
    </svg>

    <p>Details</p>

    <div class="card">
      <div class="rows">
        <p>Email</p>
        <p>{{user.email}}</p>
      </div>
      <div class="rows">
        <p>Username</p>
        <p>{{user.username}}</p>
      </div>
      <div class="rows">
        <p>First Name</p>
        <p>{{user.firstname}}</p>
      </div>
      <div class="rows">
        <p>Last Name</p>
        <p>{{user.lastname}}</p>
      </div>
      <div class="rows last" v-if="user.company">
        <p>Company</p>
        <p>{{user.company}}</p>
      </div>
      <b-button
        variant="primary"
        @click="toggleEditModal"
        v-if="storeUser && user.userid === storeUser.userid"
        >Edit
      </b-button>
    </div>

    <div class="projectContainer" v-if="user.allProjects.length > 0">
      <p>Projects</p>
      <b-list-group-item
        v-for="project in user.allProjects"
        :key="project.projectid"
        class="project"
      >
        <h3 @click="routeToProject(project.projectid)">{{project.name}}</h3>
        <p>{{project.description}}</p>
        <a href="" target="_blank" v-if="project.repositoryurl">View Code</a>
        <a href="" target="_blank" v-if="project.websiteurl">View Website</a>
      </b-list-group-item>
    </div>

    <b-modal ref="edit-modal" hide-footer hide-header class="editModal">
      <ProfileEditForm :setUser="setUser" :toggleEditModal="toggleEditModal" />
    </b-modal>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import ProfileEditForm from '../../components/other/ProfileEditForm.vue';

export default {
    middleware: "auth",
    components: {
        ProfileEditForm
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        routeToProject(id) {
            this.$router.push(`/project/${id}`);
        },
        toggleEditModal() {
            this.$refs['edit-modal'].toggle('#edit-modal');
        },
        setUser(changes) {
            this.user = {
                ...this.user,
                ...changes
            }
        }
    },
    created() {
        axiosWithAuth().get(this.$config.baseURL + '/users/user/' + this.$route.params.id)
            .then(res =>{
              this.user = res.data;
            })
            .catch(err => {
                console.dir(err)
                checkErrorStatus(err, this.$router);
            })
    },
    computed: {
        storeUser() {
            return this.$store.state.user.user;
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;

  .icon {
    font-size: 12rem;
    align-self: center;
    margin: 1% 0;
  }

  p {
    font-size: 1.6rem;
    color: #6c757d;
    font-weight: bold;
  }

  .card {
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    border-radius: 10px;

    .rows {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      padding: 10px;
      margin-top: 0.3%;

      :first-child {
        font-weight: bold;
        color: black;
        width: 20%;
        @media (max-width: 600px) {
          width: 40%;
        }
      }
      :nth-child(2) {
        color: #6c757d;
        width: 80%;
        @media (max-width: 600px) {
          width: 60%;
        }
      }
      :nth-child(6) {
        border-bottom: none;
      }
    }
    .last {
      border-bottom: none;
    }
    button {
      width: 10%;
      font-size: 1.6rem;
      margin: 0 0 2% 1.5%;

      @media (max-width: 600px) {
        width: 30%;
      }
    }
  }

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
      }

      p {
        font-size: 1.4rem;
        font-weight: normal;
        color: black;
      }

      a {
        margin-right: 2%;
      }
    }
  }
}
</style>
