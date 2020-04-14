<template>
  <div>
    <img src="../assets/logo.png" width="500px" />
    <h1>Please Log In</h1>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <br />
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <br />
        <button type="submit" @click="handleSubmit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post("http://localhost:3000/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            let is_admin = response.data.user.is_admin;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                if (is_admin == 1) {
                  this.$router.push("admin");
                } else {
                  this.$router.push("recipes");
                }
              }
            }
          })
          .catch(function(error) {
            console.error(error.response);
            if (
              JSON.stringify(error.response.data) ==
              '{"auth":false,"token":null}'
            ) {
              alert("Incorrect password.");
            } else {
              alert(JSON.stringify(error.response.data));
            }
          });
      } else {
        alert("Enter a username and password.");
      }
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4caf50; /* Green */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: "Manjari", sans-serif;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
button:hover {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}
</style>
