<template>
    <div>
        <div class="container" v-if="user">
            <b-form @submit="onSubmit" @reset="resetForm">
                <b-form-group label="First Name" label-for="firstname">
                    <b-form-input
                    id="firstname"
                    v-model="form.firstname"
                    type="text"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Last Name" label-for="lastname">
                    <b-form-input
                    id="lastname"
                    v-model="form.lastname"
                    type="text"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Company" label-for="company">
                    <b-form-input
                    id="company"
                    v-model="form.company"
                    type="text"
                    required
                    ></b-form-input>
                </b-form-group>

                <div class="btnContainer">
                    <b-button type="submit" variant="outline-primary">Submit</b-button>
                    <b-button type="reset" variant="outline-primary">Reset</b-button>
                </div>
                <p v-if="message">{{ message }}</p>
                </b-form-group>
            </b-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                company: '',
            },
            message: null
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();

            try {
                await this.$store.dispatch('user/updateUser', this.form);
                this.message = 'Your account was successfully updated';
            } catch (err) {
                console.dir(err);
            }

        },
        resetForm(e) {
            e.preventDefault();
            this.form.firstname = this.user.firstname;
            this.form.lastname = this.user.lastname;
            this.form.company = this.user.company;
        }
    },
    mounted() {
        if (this.user) {
            this.form.firstname = this.user.firstname;
            this.form.lastname = this.user.lastname;
            this.form.company = this.user.company;
        }
    },
    async created() {
        if (!this.$store.user) {
            try {
                await this.$store.dispatch('user/getInitialUserData');
                this.form.firstname = this.user.firstname;
                this.form.lastname = this.user.lastname;
                this.form.company = this.user.company;
            } catch (err) {
                console.dir(err);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.6rem;
  margin-top: 2%;

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
      font-size: 1.4rem;
      text-align: center;
      margin-top: 1%;
    }
  }
}
</style>
