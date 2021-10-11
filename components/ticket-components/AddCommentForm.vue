<template>
  <div class="formContainer">
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label-for="comment">
        <template v-slot:label>
          Comment <span class="text-danger">*</span>
        </template>
        <b-form-input
          id="comment"
          v-model="form.comment"
          type="text"
        ></b-form-input>
        <p class="validationError" v-if="errors.comment">{{errors.comment}}</p>
      </b-form-group>

      <p v-if="errMessage">{{errMessage}}</p>
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
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { generateMinimumUserFields, generateMinimumTicketFields, checkErrorStatus } from '../../util/functions';

export default {
    props: ['ticket', 'toggleCommentModal', 'addComment', 'cancelEdit', 'isEditing', 'commentToEdit', 'updateComments'],
    data() {
        return {
            form: {
                comment: ''
            },
            errMessage: '',
            isLoading: false,
            errors: {},
            requiredFields: new Set(['comment'])
        }
    },
    methods: {
        async onSubmit(e) {
            try {
                e.preventDefault();
                if (this.hasErrors()) return;
                this.isLoading = true;
                this.errMessage = '';

                if (!this.user) return;

                if (!this.isEditing) {
                    this.form.commentOwner = generateMinimumUserFields(this.user);
                    this.form.ticket = generateMinimumTicketFields(this.ticket);

                    const response = await axiosWithAuth().post(this.$config.baseURL + '/comments/comment', this.form);
                    this.isLoading = false;
                    this.addComment(response.data);
                    this.toggleCommentModal();
                } else {
                    const response = await axiosWithAuth().patch(this.$config.baseURL + '/comments/comment/' + this.commentToEdit.commentid, this.form);
                    this.isLoading = false;
                    this.updateComments(response.data);
                    this.cancelEdit();
                    this.toggleCommentModal();
                }
            } catch (err) {
                  console.dir(err);
                  this.isLoading = false;
                  this.errMessage = 'There was an error. Please try again.'
                  checkErrorStatus(err, this.$router);
            }
        },
        resetForm(e) {
            e.preventDefault();
            this.form.comment = '';
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
    },
    mounted() {
        if (this.isEditing) {
            this.form.comment = this.commentToEdit.comment;
        }
    },
    beforeDestroy() {
        this.cancelEdit();
        delete this.form.commentOwner;
        delete this.form.ticket;
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
