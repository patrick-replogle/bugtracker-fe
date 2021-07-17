<template>
  <div class="header">
    <p>{{text}}</p>
    <b-button variant="outline-primary" @click="toggle">Close</b-button>
  </div>
</template>

<script>
export default {
    props:['text', 'toggle']
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 1.6rem;
  }

  button {
    font-size: 1.6rem;
    margin-bottom: 3%;
  }
}
</style>
