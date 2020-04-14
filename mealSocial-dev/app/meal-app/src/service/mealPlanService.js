import axios from "axios";

let MEALPLANS = "/mealplans";
let BASE_URL = "http://localhost:3000";

export default {
  async getMealPlans(name) {
    let res = await axios.get(BASE_URL + MEALPLANS + "/name/" + name);
    return res.data;
  },

  async getOneMealPlan(id) {
    return axios.get(BASE_URL + MEALPLANS + "/" + id).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  async createMealPlan(name, payload) {
    return axios
      .post(BASE_URL + MEALPLANS + "/name/" + name, payload)
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  },

  async editMealPlan(id, payload) {
    return axios.put(BASE_URL + MEALPLANS + "/" + id, payload).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  async deleteMealPlan(name, id) {
    return axios
      .delete(BASE_URL + MEALPLANS + "/name/" + name + "/" + id)
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  }
};
