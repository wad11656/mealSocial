<template>
  <div class="adminPage">
    <div class="hello">
      <img src="../assets/admin_user.jpg" width="400px" />
      <h1>Administrator Console</h1>
      <h2>{{msg}}</h2>
    </div>
    <div class="employees">
      <table>
        <tr>
          <td></td>
          <td>
            <u>
              <font color="#187bcd">Name</font>
            </u>
          </td>
          <td>
            <u>Email</u>
          </td>
        </tr>
        <tr v-for="user in userList" :key="user.id">
          <td>
            <img src="../assets/trash.png" width="60px" />
          </td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/userService.js";

export default {
  data() {
    return {
      userList: {},
      msg: "Manage users here"
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      UserService.getUsers().then(
        (userList => {
          this.$set(this, "userList", userList);
        }).bind(this)
      );
    }
  }
};
</script>
<style scoped>
.employees {
  text-align: left;
  font-size: 40px;
}
h1,
h2 {
  font-weight: normal;
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