<template>
  <div class="container" v-if="$route.name!=='NotFound'">
    <header>
      <div class="nav-link">
        <img src="./assets/img/icons8-todo-list-100.png" />
        <router-link class="title2 removeUnderline" to="/">Home</router-link>
      </div>
      <router-view name="home"></router-view>
    </header>
    <router-view name="createTask"></router-view>
  </div>
  <router-view name="notFound" />
</template>

<style scoped>
.container {
  margin: 2rem auto;
  max-width: 1000px;
}

.nav-link {
  display: flex;
  align-items: center;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<script>
export default {
  mounted() {
    // console.log(this.$route);
    // console.log(this.$route.name);
  }
}
</script>