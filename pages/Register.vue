<template>
  <div class="formContainer">
    <h2>Register a new account below</h2>
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
        ></b-form-input>
        <p class="validationError" v-if="errors.email">{{errors.email}}</p>
      </b-form-group>

      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="form.username"
          type="text"
        ></b-form-input>
        <p class="validationError" v-if="errors.username">{{errors.username}}</p>
      </b-form-group>

      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          minlength="8"
        ></b-form-input>
        <p class="validationError" v-if="errors.password">{{errors.password}}</p>
      </b-form-group>

      <b-form-group label="First Name" label-for="firstname">
        <b-form-input
          id="firstName"
          v-model="form.firstname"
          type="text"
        ></b-form-input>
        <p class="validationError" v-if="errors.firstname">{{errors.firstname}}</p>
      </b-form-group>

      <b-form-group label="Last Name" label-for="lastname">
        <b-form-input
          id="lastname"
          v-model="form.lastname"
          type="text"
        ></b-form-input>
        <p class="validationError" v-if="errors.lastname">{{errors.lastname}}</p>
      </b-form-group>

      <b-form-group label="Company Name" label-for="company">
        <b-form-input
          id="company"
          v-model="form.company"
          type="text"
        ></b-form-input>

        <b-form-group
          label="Upload Image"
          label-for="imageurl"
          style="margin-top: 1%"
        >
          <b-form-file
            id="imageurl"
            @change="handleFileChange"
            v-model="imageInput"
            placeholder=""
            accept=".jpg, .png, .gif"
            ref="file-input"
          >
          </b-form-file>
        </b-form-group>

        <p v-if="errMessage.length">{{ errMessage }}</p>

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
import axios from "axios";

export default {
  layout: "unauthenticated",
  data() {
    return {
      form: {
        email: "",
        firstname: "",
        lastname: "",
        company: "",
        username: "",
        password: "",
        imageurl: null
      },
      errMessage: "",
      isLoading: false,
      imageInput: null,
      imageSizeLimit: 1500000,
      errors: {},
      requiredFields: new Set(['username', 'password', 'email', 'firstname', 'lastname'])
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.hasErrors()) return;
      this.isLoading = true;
      this.errMessage = "";

      axios
        .post(this.$config.baseURL + "/auth/register", this.form)
        .then((res) => {
          this.isLoading = false;
          window.localStorage.setItem('token', res.data.access_token);
          this.$router.push('/dashboard');
        })
        .catch((err) => {
          this.isLoading = false;
          this.errMessage = err.response.data.detail;
        });
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
      this.form.email = "";
      this.form.username = "";
      this.form.firstname = "";
      this.form.lastname = "";
      this.form.password = "";
      this.form.company = "";
      this.errMessage = "";
      this.clearFiles();
    },
    handleFileChange(e) {
      if (e.target.files[0]) {
        if (e.target.files[0].size > this.imageSizeLimit) {
          alert("File size too large.");
          this.imageInput = null;
          this.imageurl = null;
          this.clearFiles();
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            this.form.imageurl = reader.result;
          };
        }
      }
    },
    clearFiles() {
      this.$refs['file-input'].reset()
    }
  }
};
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
