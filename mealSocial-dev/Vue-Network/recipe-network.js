import axios from 'axios'
import { response } from 'express'

let RECIPE = "/recipes"
export default {
    getRecipes() {
        return axios.get(RECIPE).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    getOneRecipe(id) {
        return axios.get(RECIPE + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    createRecipe(payload) {
        return axios.post(RECIPE, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    editRecipe(id, payload) {
        return axios.put(RECIPE + "/" + id, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    deleteRecipe(id) {
        return axios.get(RECIPE + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        }) 
    }
}