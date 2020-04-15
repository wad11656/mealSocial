<template>
  <div id="bar">
    <nav>
      <br />
      <span
        id="home"
        style="float: left; width: 33%; text-align: left; font-family: Manjari, sans-serif;font-size: 20px;"
      >
        <table>
          <tr>
            <td>
              <router-link to="/">
                <img src="../assets/home.png" width="50px" />
                <br />
                <b>Home</b>
              </router-link>
            </td>
            <td width="90%"></td>
          </tr>
        </table>
      </span>
      <span
        style="float: left; width: 33%; text-align: center; font-family: Manjari, sans-serif; font-size: 20px;"
      >
        <table id="centered">
          <tr>
            <td style="padding-top: 7px;">
              <router-link to="/recipes">
                <img src="../assets/recipe.png" width="40px" />
                <br />
                <b>Recipes</b>
              </router-link>
            </td>
            <td>
              <router-link to="/mealplans">
                <img src="../assets/meal.png" width="60px" />
                <br />
                <b>MealPlans</b>
              </router-link>
            </td>
            <td style="padding-top: 7px;">
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
      <span v-if="!loggedIn">
        <br />
      </span>
      <span
        style="float: left; width: 34%; text-align: right;font-family: Manjari, sans-serif;font-size: 20px;"
      >
        <router-link id="login" to="/login" v-if="!loggedIn">
          <b>Login</b>
        </router-link>
        <table id="rightside" v-else>
          <tr>
            <td width="70%">
              <br />
              <span id="username">
                {{ userName }}
                <img src="../assets/transparent_rectangle.png" width="20px" />
              </span>
            </td>
            <td style="text-align: center; padding-top:10px;">
              <router-link to="/admin">
                <img src="../assets/gear.png" width="40px" />
                <br />
                <b>Admin</b>
              </router-link>
            </td>
            <td>
              <span id="logout" @click="handleLogout">
                <img src="../assets/waving-hand.png" width="50px" />
                <br />
                <b>Logout</b>
              </span>
            </td>
          </tr>
        </table>

        <span v-if="!loggedIn">&nbsp;|&nbsp;</span>
        <router-link id="register" to="/register" v-if="!loggedIn">
          <b>Register</b>
        </router-link>
      </span>
    </nav>
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manjari:wght@700&display=swap");

img {
  -webkit-filter: drop-shadow(4px 2px 2px rgba(150, 150, 150, 1));
}
table#rightside {
  width: 100%;
  table-layout: fixed;
}
table#centered {
  width: 100%;
  table-layout: fixed;
}
a:link,
a:visited {
  color: white;
  text-decoration: none;
}
td:hover {
  -webkit-filter: brightness(120%);
}
td:hover a,
#logout:hover {
  color: #9acee0;
}
#login:hover,
#register:hover {
  -webkit-filter: brightness(120%);
  color: #9acee0;
}

#username {
  color: white;
  font-family: "Manjari", sans-serif;
  font-size: 30px;
  text-shadow: 4px 2px 2px rgba(150, 150, 150, 1);
}
#logout {
  color: white;
  text-decoration: none;
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
    return {
      userName: ""
    };
  },
  updated() {
    if (localStorage.getItem("user") != null) {
      this.userName = JSON.parse(localStorage.getItem("user")).name;
      console.log(JSON.parse(localStorage.getItem("user")).name);
    }
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
