<template>
  <div id="app">
    <Navigation :loggedIn="loggedIn" @loggedout="setLoggedOut"></Navigation>
    <router-view @loggedIn="setLoggedIn" />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation: Navigation
  },
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    if (localStorage.getItem("jwt")) {
      this.loggedIn = true;
    }
  },
  methods: {
    setLoggedIn() {
      this.loggedIn = true;
    },
    setLoggedOut() {
      this.loggedIn = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>