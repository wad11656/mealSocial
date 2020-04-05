import axios from 'axios'
import { response } from 'express'

let USERS = "/users"
export default {

    getUsers() {
        return axios.get(USERS).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    getOneUser(id) {
        return axios.get(USERS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        })
    },

    createUser(payload) {
        return axios.post(USERS, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    editUser(id, payload) {
        return axios.put(USERS + "/" + id, payload).then(res => {
            console.log(res.data)
            return res.data
        }) 
    },

    deleteUser(id) {
        return axios.get(USERS + "/" + id).then(res => {
            console.log(res.data)
            return res.data
        }) 
    }
}