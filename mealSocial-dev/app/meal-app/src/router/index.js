import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'
import MealPlans from '../views/MealPlan.vue'
import GroceryList from '../views/GroceryList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipe
  }, 
  {
    path: '/mealplans',
    name: 'mealplans',
    component: MealPlans
  },
  {
    path: '/grocerylist',
    name: 'grocerylist',
    component: GroceryList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
