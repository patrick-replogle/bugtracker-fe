<template>
  <div class="container" v-if="user">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      style="
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      "
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
    <ProfileDetails
      :user="user"
      :toggleEditModal="toggleEditModal"
      :storeUser="storeUser"
    />

    <ProfileProjects :user="user" />

    <b-modal ref="edit-modal" hide-footer hide-header class="editModal">
      <ProfileEditForm :setUser="setUser" :toggleEditModal="toggleEditModal" />
    </b-modal>
  </div>
</template>

<script>
import { axiosWithAuth } from "../../util/axiosWithAuth.js";
import ProfileEditForm from "../../components/user-components/ProfileEditForm.vue";
import ProfileProjects from "../../components/user-components/ProfileProjects.vue";
import ProfileDetails from "../../components/user-components/ProfileDetails.vue";

export default {
  middleware: "auth",
  components: {
    ProfileEditForm,
    ProfileProjects,
    ProfileDetails
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    toggleEditModal() {
      this.$refs["edit-modal"].toggle("#edit-modal");
    },
    setUser(changes) {
      this.user = {
        ...this.user,
        ...changes
      };
    }
  },
  created() {
    axiosWithAuth()
      .get(this.$config.baseURL + "/users/user/" + this.$route.params.id)
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.dir(err);
        checkErrorStatus(err, this.$router);
      });
  },
  computed: {
    storeUser() {
      return this.$store.state.user.user;
    }
  }
};
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
}
</style>
