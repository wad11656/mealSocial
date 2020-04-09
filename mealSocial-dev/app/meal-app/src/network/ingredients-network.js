import axios from 'axios'
import { response } from 'express'

let INGREDIENTS = "/ingredients"
export default {

    getIngredients() {
        return axios.get(INGREDIENTS).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    getOneIngredient(id) {
        return axios.get(INGREDIENTS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    createIngredient(payload) {
        return axios.post(INGREDIENTS, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    editIngredient(id, payload) {
        return axios.put(INGREDIENTS + "/" + id, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    deleteIngredient(id) {
        return axios.get(INGREDIENTS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        }) 
    }
}