<template>
  <div class="hello">
    <img src="../assets/logo.png" width="500px" />
    <h1>Welcome to MealSocial!</h1>
    <h2>
      <i>{{ msg }}</i>
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Create and save your favorite recipes!"
    };
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manjari:wght@700&display=swap");
h1,
h2 {
  font-weight: normal;
  font-family: "Manjari", sans-serif;
}
h2 {
  color: goldenrod;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
