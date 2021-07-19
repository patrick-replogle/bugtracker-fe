<template>
  <div class="formContainer">
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label="Title" label-for="title">
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Description" label-for="description">
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          :maxlength="max"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Upload Image" label-for="imageurl">
        <b-form-file
          id="imageurl"
          @change="handleFileChange"
          v-model="imageInput"
          placeholder="Choose an image"
          drop-placeholder="Drop file here..."
          accept=".jpg, .png, .gif"
        >
        </b-form-file>
      </b-form-group>

      <b-form-group label="Priority" label-for="priority">
        <b-form-select
          id="priority"
          v-model="form.priority"
          :options="priorityOptions"
        >
        </b-form-select>
      </b-form-group>

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
    </b-form>
  </div>
</template>

<script>
import { axiosWithAuth } from "../../util/axiosWithAuth.js";
import {
  generateMinimumUserFields,
  generateMinimumProjectFields,
  checkErrorStatus
} from "../../util/functions";

export default {
  props: ["toggleModal", "project"],
  data() {
    return {
      form: {
        title: "",
        description: "",
        imageurl: null,
        completed: false,
        priority: "LOW"
      },
      priorityOptions: ["LOW", "MEDIUM", "HIGH"],
      errMessage: "",
      max: 255,
      isLoading: false,
      imageInput: null,
      imageSizeLimit: 15000000
    };
  },
  methods: {
    async onSubmit(e) {
      try {
        e.preventDefault();
        this.isLoading = true;
        this.errMessage = "";

        if (!this.user) return;

        this.form.ticketOwner = generateMinimumUserFields(this.user);
        this.form.project = generateMinimumProjectFields(this.project);

        const response = await axiosWithAuth().post(
          this.$config.baseURL + "/tickets/ticket",
          this.form
        );
        this.isLoading = false;
        this.toggleModal();
        this.project.tickets.push(response.data);
      } catch (err) {
        console.dir(err);
        this.isLoading = false;
        this.errMessage =
          "There was error while processing your request. Please try again.";
        checkErrorStatus(err, this.$router);
      }
    },
    resetForm(e) {
      e.preventDefault();
      (this.form.title = ""),
        (this.form.description = ""),
        (this.form.imageurl = ""),
        (this.form.completed = false),
        (this.form.priority = "LOW");
    },
    handleFileChange(e) {
      if (e.target.files[0]) {
        if (e.target.files[0].size > this.imageSizeLimit) {
          alert("File size too large.");
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            this.form.imageurl = reader.result;
          };
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
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

    input,
    select {
      padding: 10px;
      height: 40px;
      font-size: 1.6rem;
    }

    textarea {
      padding: 10px;
      height: 100px;
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
  }
}
</style>
