<template>
  <div class="formContainer">
    <h2 v-if="!isEditing">Create a New Project</h2>
    <h2 v-else>Edit a project</h2>
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label-for="name">
        <template v-slot:label>
          Project Name <span class="text-danger">*</span>
        </template>
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          :maxlength="max"
        ></b-form-input>
        <p class="validationError" v-if="errors.name">{{errors.name}}</p>
      </b-form-group>

      <b-form-group label-for="description">
        <template v-slot:label>
          Description <span class="text-danger">*</span>
        </template>
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          :maxlength="max"
        ></b-form-textarea>
        <p class="validationError" v-if="errors.description">{{errors.description}}</p>
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

      <b-form-group label="Upload Image" label-for="imageurl">
        <b-form-file
          id="imageurl" 
          @change="handleFileChange"
          v-model="imageInput"
          :placeholder="form.imageurl ? form.imageurl : ''"
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
                imageurl: null
            },
            errMessage: '',
            max: 255,
            isLoading: false,
            imageInput: [],
            imageSizeLimit: 1500000,
            errors: {},
            requiredFields: new Set(['name', 'description'])
        }
    },
    methods: {
        async onSubmit(e) {
            if (!this.user) return;

            try {
              e.preventDefault();
              if (this.hasErrors()) return;
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
        handleFileChange(e) {
          if (e.target.files[0]) {
            if (e.target.files[0].size > this.imageSizeLimit) {
              alert('File size too large.');
              this.imageInput = null;
              this.imageurl = null;
              this.clearFiles();
            } else {
              var reader = new FileReader()
              reader.readAsDataURL(e.target.files[0])
              reader.onload = ()=> {
                this.form.imageurl = reader.result;
              };
            }
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
            this.imageInput = null;
            this.clearFiles();
            this.$store.commit('user/cancelEdit');
        },
        clearFiles() {
            this.$refs['file-input'].reset()
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
    .validationError {
      margin-bottom: -2%;
    }
  }
}
</style>
