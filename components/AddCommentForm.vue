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
    props: ['ticket', 'toggleCommentModal', 'addComment', 'cancelEdit', 'isEditing', 'commentToEdit'],
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
            }
        } catch (err) {
            console.dir(err);
            this.errMessage = 'There was an error. Please try again.'
        }
        },
        resetForm(e) {
            e.preventDefault();
            this.comment = '';
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
}
</script>

<style lang="scss" scoped></style>
