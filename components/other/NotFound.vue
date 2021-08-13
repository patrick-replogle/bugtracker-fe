<template>
    <div class="container">
        <div class="alert alert-danger" role="alert">
            An error has occurred. The page you are looking for was not found.
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .container {
        font-size: 1.6rem;
        width: 100%;
        .alert {
            height: 7rem;
            display: flex;
            align-items: center;
            width: 100%;
            margin-top: 1%;
        }
    }

</style>