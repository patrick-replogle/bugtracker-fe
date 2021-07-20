<template>
    <div class="formContainer" v-if="user">
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
                >Submit</b-button>
                <b-button v-if="isLoading" disabled variant="outline-primary">
                    <b-spinner
                    variant="primary"
                    label="Spinning"
                    class="spinner"></b-spinner
                ></b-button>
                <b-button type="reset" variant="outline-primary">Reset</b-button>
                <b-button  variant="outline-primary" @click="toggleEditModal">Cancel</b-button>
            </div>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
export default {
    props: ['setUser', 'toggleEditModal'],
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                company: '',
                imageurl: null
            },
            isLoading: false,
            imageInput: [],
            imageSizeLimit: 1500000
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
            this.isLoading = true;
            try {
                await this.$store.dispatch('user/updateUser', this.form);
                this.isLoading = false;
                this.setUser(this.form);
                this.toggleEditModal();
            } catch (err) {
                this.isLoading = false;
                console.dir(err);
            }
        },
        resetForm(e) {
            e.preventDefault();
            this.form.firstname = this.user.firstname;
            this.form.lastname = this.user.lastname;
            this.form.company = this.user.company;
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
    mounted() {
        if (this.user) {
            this.form.firstname = this.user.firstname;
            this.form.lastname = this.user.lastname;
            this.form.company = this.user.company;
            this.form.imageurl = this.user.imageurl;
        }
    },
    async created() {
        if (!this.$store.user) {
            try {
                await this.$store.dispatch('user/getInitialUserData');
                this.form.firstname = this.user.firstname;
                this.form.lastname = this.user.lastname;
                this.form.company = this.user.company;
                this.form.imageurl = this.user.imageurl;
            } catch (err) {
                console.dir(err);
            }
        }
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

    input,
    select {
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
  }
}
</style>
