<template>
  <b-nav class="nav">
    <div class="left">
      <h3>Bugtracker</h3>
    </div>
    <div class="right">
      <b-nav-item to="/register">Register</b-nav-item>
      <b-nav-item to="/login">Login</b-nav-item>
    </div>
  </b-nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nav {
  padding: 10px 50px;
  background: #082c40;
  color: white;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .left {
    width: 20%;
    display: flex;
    justify-content: flex-start;

    h3 {
      font-size: 2.5rem;
    }
  }

  .right {
    width: 80%;
    display: flex;
    justify-content: flex-end;

    a {
      color: white;
      text-decoration: none;
      font-size: 1.6rem;
    }
  }
}
</style>
