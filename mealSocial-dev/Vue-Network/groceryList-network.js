import axios from 'axios'
import { response } from 'express'

let GROCERY_LISTS = "/grocerylists"
export default {

    getGroceryLists() {
        return axios.get(GROCERY_LISTS).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    getOneGroceryList(id) {
        return axios.get(GROCERY_LISTS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    createGroceryList(payload) {
        return axios.post(GROCERY_LISTS, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    editGroceryList(id, payload) {
        return axios.put(GROCERY_LISTS + "/" + id, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    deleteGroceryList(id) {
        return axios.get(GROCERY_LISTS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        }) 
    }
}