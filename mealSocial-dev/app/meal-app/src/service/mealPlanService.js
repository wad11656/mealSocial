import axios from "axios";

let MEALPLANS = "";
let BASE_URL = "http://localhost:3000";
export default {
  getMealPlans() {
    return axios.get(MEALPLANS).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  getOneMealPlan(id) {
    return axios.get(BASE_URL + MEALPLANS + "/" + id).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  createMealPlan(payload) {
    return axios.post(BASE_URL + MEALPLANS, payload).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  editMealPlan(id, payload) {
    return axios.put(BASE_URL + MEALPLANS + "/" + id, payload).then(res => {
      console.log(res.data);
      return res.data;
    });
  },

  deleteMealPlan(id) {
    return axios.get(BASE_URL + MEALPLANS + "/" + id).then(res => {
      console.log(res.data);
      return res.data;
    });
  }
};
