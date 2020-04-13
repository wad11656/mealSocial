import Vue from "vue";
import Router from "vue-router";
import Recipe from "../views/Recipe.vue";
import MealPlans from "../views/MealPlan.vue";
import GroceryList from "../views/GroceryList.vue";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login";
import Register from "@/components/Register";
import UserBoard from "@/components/UserBoard";
import Admin from "@/components/Admin";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/recipes",
      name: "Recipes",
      component: Recipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/mealplans",
      name: "mealplans",
      component: MealPlans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/grocerylist",
      name: "grocerylist",
      component: GroceryList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/userboard",
      name: "userboard",
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next();
        } else {
          next({ name: "userboard" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else {
      next({ name: "userboard" });
    }
  } else {
    next();
  }
});

export default router;
