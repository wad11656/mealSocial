import axios from 'axios'

let RECIPE = "/recipes"
let BASE_URL = "http://localhost:3000"

export default {
    async getRecipes(name) {
        let res = await axios.get(BASE_URL + RECIPE + "/name/" + name);
        return res.data;
    },

    async getOneRecipe(id) {
        let res = await axios.get(BASE_URL + RECIPE + "/" + id);
        return res.data;
    },

    async createRecipe(payload) {
        let res = await axios.post(BASE_URL + RECIPE, payload);
        return res.data;
    },

    async editRecipe(id, payload) {
        let res = await axios.put(BASE_URL + RECIPE + "/" + id, payload);
        return res.data;
    },

    async deleteRecipe(id) {
        let res = await axios.delete(BASE_URL + RECIPE + "/" + id);
        return res.data;
    }
}