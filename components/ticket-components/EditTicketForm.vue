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

      <b-form-group label="Image" label-for="imageurl">
        <b-form-input
          id="imageurl"
          v-model="form.imageurl"
          type="text"
        ></b-form-input>
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

      <div class="btnContainer">
        <b-button type="submit" variant="outline-primary">Submit</b-button>
        <b-button type="reset" variant="outline-primary">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { checkErrorStatus } from '../../util/functions';

export default {
    props: ['toggleEditModal', 'ticket', 'setTicket'],
    data() {
      return {
          form: {
              title: '',
              description: '',
              imageurl: '',
              completed: false,
              priority: 'LOW'
          },
          completedOptions: [false, true],
          priorityOptions: ['LOW', 'MEDIUM', 'HIGH'],
          errMessage: '',
          max: 255,
      }
  },
  methods: {
    async onSubmit(e) {

      try {
        e.preventDefault();
        this.errMessage = '';

        if (!this.user) return;

        const response = await axiosWithAuth().patch(this.$config.baseURL + '/tickets/ticket/' + this.ticket.ticketid, this.form);
        this.setTicket(response.data);
        this.toggleEditModal();
        if (this.user.assignedTickets.find(t => t.ticketid === this.ticket.ticketid)) {
            this.$store.commit('user/updateTicket', response.data)
        }
      } catch (err) {
        console.dir(err)
        this.errMessage = 'There was an error. Please try again.'
        checkErrorStatus(err, this.$router);
      }
    },
    resetForm(e) {
        e.preventDefault();
        this.form.title =  '',
        this.form.description=  '',
        this.form.imageurl = '',
        this.form.completed = false,
        this.form.priority = 'LOW'
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    mounted() {
        this.form.title = this.ticket.title;
        this.form.description = this.ticket.description;
        this.form.imageurl = this.ticket.imageurl;
        this.form.completed = this.ticket.completed;
        this.form.priority = this.ticket.priority;
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
