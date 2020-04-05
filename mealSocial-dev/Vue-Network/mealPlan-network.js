import axios from 'axios'
import { response } from 'express'

let MEALPLANS = "/mealplans"
export default {

    getMealPlans() {
        return axios.get(MEALPLANS).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    getOneMealPlan(id) {
        return axios.get(MEALPLANS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    createMealPlan(payload) {
        return axios.post(MEALPLANS, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    editMealPlan(id, payload) {
        return axios.put(MEALPLANS + "/" + id, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    deleteMealPlan(id) {
        return axios.get(MEALPLANS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        }) 
    }
}