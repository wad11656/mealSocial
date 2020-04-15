<template>
  <div class="adminPage">
    <div class="hello">
      <img src="../assets/admin_user.jpg" width="400px" />
      <h1>Administrator Console</h1>
      <h2>
        <i>{{msg}}</i>
      </h2>
    </div>
    <div class="employees">
      <table width="100%">
        <tr>
          <td></td>
          <td>
            <u>
              <font color="#187bcd">Name</font>
            </u>
          </td>
          <td>
            <font color="#06a94d">
              <u>Email</u>
            </font>
          </td>
          <td>
            <font color="#DC143C">
              <u>Admin</u>
            </font>
          </td>
        </tr>
        <tr v-for="user in userList" :key="user.id">
          <td>
            <img
              id="trash"
              v-on:click="deleteUserData(user.id)"
              src="../assets/trash.png"
              width="60px"
            />
          </td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>
            <input
              type="checkbox"
              v-model="user.is_admin"
              @change="changeAdminStatus(user.id, user)"
            />
            <!-- <input type="checkbox" v-else :true-value="0" /> -->
          </td>
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
      msg: "Manage site users"
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
    },
    async deleteUserData(id) {
      UserService.deleteUser(id).then(response => {
        console.log(response);
        this.getUserData();
      });
    },
    async changeAdminStatus(userId, user) {
      var userJson = JSON.parse(localStorage.user);
      if (user.is_admin == "0") {
        userJson.is_admin = "0";
        localStorage.setItem("user", JSON.stringify(userJson));
      } else {
        userJson.is_admin = "1";
        localStorage.setItem("user", JSON.stringify(userJson));
      }
      UserService.editUser(userId, user).then(async () => {
        await this.getUserData();
      });
      this.$forceUpdate();
    }
  }
};
</script>
<style scoped>
input[type="checkbox" i] {
  cursor: pointer;
  width: 50px;
  height: 50px;
}
#trash {
  cursor: pointer;
}
.employees {
  text-align: left;
  font-size: 40px;
}
h1,
h2 {
  font-weight: normal;
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
td {
  padding-right: 20px;
}
</style>