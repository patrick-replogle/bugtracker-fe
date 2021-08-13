<template>
  <div class="formContainer">
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label="Title" label-for="title">
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
        ></b-form-input>
        <p class="validationError" v-if="errors.title">{{errors.title}}</p>
      </b-form-group>

      <b-form-group label="Description" label-for="description">
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          :maxlength="max"
        ></b-form-textarea>
        <p class="validationError" v-if="errors.description">{{errors.description}}</p>
      </b-form-group>

      <b-form-group label="Priority" label-for="priority">
        <b-form-select
          id="priority"
          v-model="form.priority"
          :options="priorityOptions"
        >
        </b-form-select>
      </b-form-group>

      <b-form-group label="Completed" label-for="completed">
        <b-form-select
          id="completed"
          v-model="form.completed"
          :options="completedOptions"
        >
        </b-form-select>
      </b-form-group>

      <b-form-group label="Upload Image" label-for="imageurl">
        <b-form-file
          id="imageurl"
          @change="handleFileChange"
          v-model="imageInput"
          :placeholder="form.imageurl ? form.imageurl : ''"
          accept=".jpg, .png, .gif"
        >
        </b-form-file>
      </b-form-group>

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
import { checkErrorStatus } from "../../util/functions";

export default {
  props: ["toggleEditModal", "ticket", "setTicket"],
  data() {
    return {
      form: {
        title: "",
        description: "",
        imageurl: "",
        completed: false,
        priority: "LOW"
      },
      completedOptions: [false, true],
      priorityOptions: ["LOW", "MEDIUM", "HIGH"],
      errMessage: "",
      max: 255,
      isLoading: false,
      imageInput: [],
      imageSizeLimit: 1500000,
      errors: {},
      requiredFields: new Set(['title', 'description'])
    };
  },
  methods: {
    async onSubmit(e) {
      try {
        e.preventDefault();
        if (this.hasErrors()) return;
        this.isLoading = true;
        this.errMessage = "";

        if (!this.user) return;

        const response = await axiosWithAuth().patch(
          this.$config.baseURL + "/tickets/ticket/" + this.ticket.ticketid,
          this.form
        );
        this.isLoading = false;
        this.setTicket(response.data);
        this.toggleEditModal();
        if (
          this.user.assignedTickets.find(
            (t) => t.ticketid === this.ticket.ticketid
          )
        ) {
          this.$store.commit("user/updateTicket", response.data);
        }
      } catch (err) {
        console.dir(err);
        this.isLoading = false;
        this.errMessage = "There was an error. Please try again.";
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
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  mounted() {
    this.form.title = this.ticket.title;
    this.form.description = this.ticket.description;
    this.form.imageurl = this.ticket.imageurl;
    this.form.completed = this.ticket.completed;
    this.form.priority = this.ticket.priority;
    this.form.imageurl = this.ticket.imageurl;
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

    .validationError {
      margin-bottom: -2%;
    }
  }
}
</style>
