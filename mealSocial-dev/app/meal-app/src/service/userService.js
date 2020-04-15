import axios from "axios";

let USERS = "/users";
let BASE_URL = "http://localhost:3000";

export default {
  getUsers() {
    return axios.get(BASE_URL + USERS).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  getOneUser(id) {
    return axios.get(BASE_URL + USERS + "/" + id).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  createUser(payload) {
    return axios.post(BASE_URL + USERS, payload).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  editUser(id, payload) {
    return axios.put(BASE_URL + USERS + "/" + id, payload).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  deleteUser(id) {
    return axios.get(BASE_URL + USERS + "/" + id).then(res => {
      console.log(res.data);
      return res.data;
    });
  }
};
