<template>
  <div class="formContainer">
    <b-form @submit="onSubmit">
      <b-form-group
        label="Search by name, email or username"
        label-for="search"
        class="label"
      >
      </b-form-group>
      <div class="inputContainer">
        <b-form-input
          id="search"
          v-model="form.search"
          type="text"
          required
        ></b-form-input>

        <b-button v-if="!isLoading" type="submit" variant="outline-primary"
          >Submit</b-button
        >
        <b-button v-if="isLoading" disabled variant="outline-primary">
          <b-spinner
            variant="primary"
            label="Spinning"
            class="spinner"
          ></b-spinner
        ></b-button>
        <b-button variant="outline-primary" @click="toggleSearchModal"
          >Close</b-button
        >
      </div>
    </b-form>

    <p style="text-align: center; margin-top: 2%;">{{errMessage}}</p>

    <b-list-group v-if="users && users.length" style="width: 100%;">
      <b-list-group-item class="user" v-for="u in users" :key="u.userid">
        <div style="display: flex; align-items: center;">
          <b-avatar class="mr-3"></b-avatar>
          <div style="display: flex; flex-direction: column;">
            <span>{{u.firstname}} {{u.lastname}}</span>
            <span style="font-size: 1.4rem;">{{u.email}}</span>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          width="1em"
          height="1em"
          style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          class="icon"
          v-if="findUser(u) && u.userid !== user.userid"
          @click="removeUser(u)"
        >
          <g fill="none">
            <path
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm-4.25 9.25a.75.75 0 0 0-.102 1.493l.102.007h8.5a.75.75 0 0 0 .102-1.493l-.102-.007h-8.5z"
              fill="#dc3545"
            />
          </g>
        </svg>

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
          v-if="!findUser(u) && u.userid !== user.userid"
          @click="addUser(u)"
        >
          <path
            d="M16 2A14.172 14.172 0 0 0 2 16a14.172 14.172 0 0 0 14 14a14.172 14.172 0 0 0 14-14A14.172 14.172 0 0 0 16 2zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7z"
            fill="#28a745"
          />
        </svg>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { checkErrorStatus } from '../../util/functions'

export default {
    props: ['project', 'toggleSearchModal', 'removeUser', 'addUser'],
    data() {
        return {
            form: {
                search: '',
            },
            users: null,
            isLoading: false,
            errMessage: ''
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();
            this.isLoading = true;
            this.errMessage = '';
            try {
                if (this.form.search.length) {
                    const payload = this.form.search.split(' ').join('').toLowerCase().trim();
                    const response = await axiosWithAuth().get(this.$config.baseURL + '/users/user/search/' + payload);
                    this.isLoading = false;
                    this.form.search = '';
                    this.users = response.data;
                    if (response.data.length === 0) {
                      this.errMessage = 'No results found'
                    }
                }
            } catch (err) {
                console.dir(err)
                this.isLoading = false;
                checkErrorStatus(err, this.$router);
            }
        },
        findUser(user) {
            return this.project.users.find(u => u.userid === user.userid);
        },
    }
}
</script>

<style lang="scss" scoped>
.formContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.6rem;

  form {
    width: 100%;
    max-width: 800px;

    .label {
      font-size: 1.6rem;
      @media (max-width: 600px) {
        font-size: 1.4rem;
      }
    }

    .inputContainer {
      display: flex;
      @media (max-width: 600px) {
        flex-direction: column;
      }

      input {
        padding: 10px;
        height: 40px;
        font-size: 1.6rem;
      }

      button {
        font-size: 1.8rem;
        margin: 0 2%;
        border-radius: 6px;
        width: 30%;
        @media (max-width: 600px) {
          width: 100%;
          margin: 1% 0;
          font-size: 1.4rem;
        }
      }
    }
  }

  .user {
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin: 1% 0;
    border-radius: 6px;

    .icon {
      font-size: 4rem;
      margin-top: 1%;
      cursor: pointer;

      @media (max-width: 600px) {
        font-size: 3rem;
        margin-top: 3%;
      }

      &:hover {
        filter: brightness(0.5);
      }
    }
  }
}
</style>
