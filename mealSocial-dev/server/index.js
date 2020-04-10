const express = require('express')
const path = require('path')
const Enforcer = require('openapi-enforcer-middleware')
var cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
// Create an enforcermiddleware instance

const enforcer = Enforcer(path.resolve(__dirname, "mealPlan.yaml"))

enforcer.controllers(path.resolve(__dirname, "controllers"))

app.use(enforcer.middleware())

app.listen(3000, function () {
  console.log('Listening on port 3000!')
});