<template>
  <div id="bar">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-if="!loggedIn">Login</router-link>
      <span @click="handleLogout" v-else>Logout</span>
    </nav>
  </div>
</template>

<style scoped>
#bar {
  background-color: yellow;
}
</style>
<script>
export default {
  props: ["loggedIn"],
  data() {
    return {};
  },
  methods: {
    handleLogout(e) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$emit("loggedout");
      if (this.$router.currentRoute.path != "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>
