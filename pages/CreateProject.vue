<template>
  <div class="formContainer">
    <h2>Create a new project</h2>
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label="Name" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          :maxlength="max"
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

      <b-form-group label="Repository URL" label-for="respositoryurl">
        <b-form-input
          id="repositoryurl"
          v-model="form.repositoryurl"
          :maxlength="max"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Deployed URL" label-for="websiteurl">
        <b-form-input
          id="websiteurl"
          v-model="form.websiteurl"
          :maxlength="max"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Image URL" label-for="imageurl">
        <b-form-input
          id="imageurl"
          v-model="form.imageurl"
          :maxlength="max"
          type="text"
        ></b-form-input>
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
import { generateMinimumUserFields } from '../util/functions';

export default {
   middleware: "auth",
    data() {
        return {
            form: {
                name: '',
                description: '',
                repositoryurl: '',
                websiteurl: '',
                imageurl: '',
            },
            errMessage: '',
            max: 255,
            isLoading: false
        }
    },
    methods: {
        async onSubmit(e) {
            if (!this.user) return;

            try {
              e.preventDefault();
              this.isLoading = true;
              this.errMessage = '';
              this.form.projectOwner = generateMinimumUserFields(this.user);

              if (!this.isEditing) {
                await this.$store.dispatch('user/createProject', this.form);
                this.isLoading = false;
              } else {
                await this.$store.dispatch('user/updateProject', this.form);
                this.isLoading = false;
              }
            } catch (err) {
                this.isLoading = false;
            }
  
        },
        resetForm(e) {
            e.preventDefault();
            this.form.name = '';
            this.form.description = '';
            this.form.repositoryurl = '';
            this.form.websiteurl = '';
            this.form.imageurl = '';
            this.errMessage = '';
            this.$store.commit('user/cancelEdit');
        }
    },
    computed: {
      user() {
          return this.$store.state.user.user;
      },
      isEditing() {
        return this.$store.state.user.isEditing;
      },
      projectToEdit() {
        return this.$store.state.user.projectToEdit;
      }
    },
    mounted() {
      if (this.isEditing) {
        this.form.name = this.projectToEdit.name;
        this.form.description = this.projectToEdit.description;
        this.form.repositoryurl = this.projectToEdit.repositoryurl;
        this.form.websiteurl = this.projectToEdit.websiteurl;
        this.form.imageurl = this.projectToEdit.imageurl;
      }
    },
    beforeDestroy() {
      this.$store.commit('user/cancelEdit');
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
