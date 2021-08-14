<template>
    <div class="container">
        <div class="alert alert-danger" role="alert">
            <p>404 NOT FOUND</p> 
            <p>The page you are looking for no longer exists.</p>
            <b-button variant="danger" @click="goBack">Back</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['error'],
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .alert {
            display: flex;
            flex-direction: column;
            margin-top: 3%;
            text-align: left;
            padding: 20px 40px;

            p:first-child {
                font-size: 3rem;
                @media (max-width: 600px) {
                    font-size: 2rem;
                }
            }

            p:nth-child(2) {
                font-style: italic;
            }
            button {
                width: 30%;
                align-self: center;
                font-size: 1.6rem;
                background-color: #f8d7da;
                border: 2px solid #721c24;
                color: #721c24;

                &:hover {
                    opacity: .6;
                }
                @media (max-width: 600px) {
                    width: 60%;
                }
            }
        }
    }
</style>