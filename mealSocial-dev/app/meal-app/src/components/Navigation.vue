<template>
  <div id="bar">
    <nav>
      <br />
      <span style="float: left; width: 34%; text-align: left;">
        <router-link to="/">
          <img src="../assets/home.png" width="50px" />
          <br />
          <b>Home</b>
        </router-link>
      </span>
      <span style="float: left; width: 33%; text-align: center;">
        <table>
          <tr>
            <td>
              <router-link to="/recipes">
                <img src="../assets/recipe.png" width="40px" />
                <br />
                <b>Recipes</b>
              </router-link>
            </td>
            <td>
              <router-link to="/mealplans">
                <img src="../assets/meal.png" width="50px" />
                <br />
                <b>MealPlans</b>
              </router-link>
            </td>
            <td>
              <router-link to="/grocerylist">
                <img src="../assets/shopping.png" width="40px" />
                <br />
                <b>GroceryList</b>
              </router-link>
            </td>
          </tr>
        </table>
      </span>
      <!-- 
      <br />
      <span style="float: left; width: 33%; text-align: center;">
        <router-link to="/recipes">
          <img src="../assets/recipe.png" width="30px" />Recipes
        </router-link>&nbsp;|
        <router-link to="/mealplans">
          <img src="../assets/meal.png" width="40px" />MealPlans
        </router-link>&nbsp;|
        <router-link to="/grocerylist">
          <img src="../assets/shopping.png" width="30px" />GroceryList
        </router-link>
      </span>
      -->
      <br />
      <span style="float: left; width: 33%; text-align: right;">
        <router-link to="/login" v-if="!loggedIn">Login</router-link>
        <span id="logout" @click="handleLogout" v-else>Logout</span>
        <span v-if="!loggedIn">&nbsp;|&nbsp;</span>
        <router-link to="/register" v-if="!loggedIn">Register</router-link>
      </span>
    </nav>
  </div>
</template>

<style scoped>
td {
  padding-left: 70px;
}
a:link,
a:visited {
  color: white;
}
#logout {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}
#bar {
  /* background-color: yellow; */
  background: rgb(66, 145, 14, 1);
  background: linear-gradient(
    0deg,
    rgba(66, 145, 14, 1) 0%,
    rgba(40, 255, 0, 1) 100%
  );
  overflow: auto;
  position: relative;
  top: -8px;
  right: -10px;
  left: -8px;
  margin: 0 auto;
  border: 0 auto;
  width: calc(100% + 6px);
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 20px;
}
</style>
<script>
export default {
  props: ["loggedIn"],
  data() {
    return {};
  },
  methods: {
    handleLogout() {
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
