<template>
  <div>
    <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
  </div>
</template>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);

  .spinner {
    height: 8rem;
    width: 8rem;

    @media (max-width: 600px) {
      height: 5rem;
      width: 5rem;
    }
  }
}
</style>
