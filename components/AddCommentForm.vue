<template>
  <div class="formContainer">
    <b-form @submit="onSubmit" @reset="resetForm">
      <b-form-group label="Comment" label-for="comment">
        <b-form-input
          id="comment"
          v-model="form.comment"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <p v-if="errMessage">{{errMessage}}</p>
      <div class="btnContainer">
        <b-button type="submit" variant="outline-primary">Submit</b-button>
        <b-button type="reset" variant="outline-primary">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { axiosWithAuth } from '../util/axiosWithAuth.js';
import { generateMinimumUserFields, generateMinimumTicketFields } from '../util/functions'

export default {
    props: ['ticket', 'toggleCommentModal', 'addComment', 'cancelEdit', 'isEditing', 'commentToEdit', 'updateComments'],
    data() {
        return {
            form: {
                comment: ''
            }
        }
    },
    methods: {
        async onSubmit(e) {
            try {
                e.preventDefault();
                this.errMessage = '';

                if (!this.user) return;

                if (!this.isEditing) {
                    this.form.commentOwner = generateMinimumUserFields(this.user);
                    this.form.ticket = generateMinimumTicketFields(this.ticket);

                    const response = await axiosWithAuth().post(this.$config.baseURL + '/comments/comment', this.form);
                    this.addComment(response.data);
                    this.toggleCommentModal();
                } else {
                const response = await axiosWithAuth().patch(this.$config.baseURL + '/comments/comment/' + this.commentToEdit.commentid, this.form);
                this.updateComments(response.data);
                this.cancelEdit();
                this.toggleCommentModal();
                }
            } catch (err) {
                console.dir(err);
                this.errMessage = 'There was an error. Please try again.'
            }
        },
        resetForm(e) {
            e.preventDefault();
            this.form.comment = '';
        }
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
  }
}
</style>
