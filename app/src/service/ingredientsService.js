import axios from 'axios'

let INGREDIENTS = "/ingredients"
let BASE_URL = "http://localhost:3000"

export default {
    async getIngredients() {
        let res = await axios.get(BASE_URL + INGREDIENTS);
        return res.data;
    },

    async getOneIngredient(id) {
        let res = await axios.get(BASE_URL + INGREDIENTS + "/" + id);
        return res.data;
    },

    async createIngredient(payload) {
        let res = await axios.post(BASE_URL + INGREDIENTS, payload);
        return res.data;
    },

    async editIngredient(id, payload) {
        let res = await axios.put(BASE_URL + INGREDIENTS + "/" + id, payload);
        return res.data;
    },

    async deleteIngredient(id) {
        let res = await axios.delete(BASE_URL + INGREDIENTS + "/" + id);
        return res.data;
    }
}