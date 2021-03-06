<template>
  <div class="formContainer">
    <h2>Login Below</h2>
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label-for="username">
        <template v-slot:label>
          Username <span class="text-danger">*</span>
        </template>
        <b-form-input
          id="username"
          v-model="form.username"
          type="text"
        ></b-form-input>
        <p class="validationError" v-if="errors.username">{{errors.username}}</p>
      </b-form-group>

      <b-form-group label-for="password">
        <template v-slot:label>
          Password <span class="text-danger">*</span>
        </template>
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
        ></b-form-input>
        <p class="validationError" v-if="errors.password">{{errors.password}}</p>
      </b-form-group>
      <b-form-group>
        <p v-if="errMessage">{{ errMessage }}</p>
        <div class="btnContainer">
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
          <b-button type="reset" variant="outline-primary">Reset</b-button>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'unauthenticated',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            errMessage: null,
            isLoading: false,
            errors: {},
            requiredFields: new Set(['username', 'password'])
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            if (this.hasErrors()) return;
            this.errMessage = null;
            this.isLoading = true;

            axios.post(this.$config.baseURL + '/auth/login', this.form)
                .then(res => {
                    this.isLoading = false;
                    window.localStorage.setItem('token', res.data.access_token);
                    this.$router.push('/dashboard');
                })
                .catch(err => {
                    this.isLoading = false;
                    this.errMessage = "Invalid username or password";
                    console.dir(err)
                })

        },
        hasErrors() {
            this.errors = {};
            for (let field of this.requiredFields) {
              if (!this.form[field].trim().length) {
                this.errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
              }
            }

            return Object.keys(this.errors).length !== 0;
        },
        resetForm(e) {
            e.preventDefault();
            this.form.email = '';
            this.form.username = '';
            this.form.firstname = '';
            this.form.lastname = '';
            this.form.password = '';
            this.form.company = '';
            this.errMessage = '';
        }
    },
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

  h2 {
    margin: 2% 0;
    @media (max-width: 600px) {
      margin: 4% 0;
      font-size: 1.6rem;
      max-width: 80%;
    }
  }
  form {
    width: 80%;
    max-width: 800px;

    label {
      font-weight: 600;
      display: flex;
    }

    input {
      padding: 10px;
      height: 40px;
      font-size: 1.6rem;
    }

    .btnContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2% 0;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      button {
        height: 40px;
        font-size: 1.8rem;
        margin: 0 2%;
        border-radius: 6px;
        width: 30%;
        @media (max-width: 600px) {
          width: 100%;
          margin: 4% 0;
        }
      }
    }
    p {
      color: crimson;
      font-size: 1.4rem;
      text-align: center;
      margin-top: 1%;
    }

    .validationError {
      margin-bottom: -2%;
    }
  }
}
</style>