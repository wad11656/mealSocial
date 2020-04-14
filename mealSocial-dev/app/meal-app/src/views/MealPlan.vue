<template>
  <div class="mealPlanPage">
    <h1>MealPlans</h1>
    <button id="add" type="submit" @click="addNewMealPlan">Add New</button>
    <div class="mealPlanCard" v-for="(mealPlan, index) in mealPlanList" :key="mealPlan.id">
      <div class="container">
        <div>
          <h2>
            {{mealPlan.mealPlanName}}
            <button
              id="delete"
              type="submit"
              @click="deleteMealPlan(mealPlan.id)"
            >Delete</button>
          </h2>
          <select v-on:change="e => addRecipeToMealPlan(e, mealPlan.id)">
            <option disabled selected value>Select recipe to add</option>
            <option
              v-for="selectable in allRecipes"
              :value="selectable.id"
              :key="selectable.id"
            >{{selectable.recipeName}}</option>
          </select>
          <a href="#">change day</a>
        </div>
        <div
          class="recipes"
          v-for="(recipe, recipeIndex) in recipes[index]"
          :key="recipe.recipeName"
        >
          <img :src="recipe.imageUrl" width="100px" />
          <p>
            {{recipe.recipeName}}
            <a
              href="#"
              v-on:click="removeRecipeFromMealPlan(mealPlan.id, recipe.recipeId, recipeIndex)"
            >delete</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MealPlanService from "@/service/mealPlanService.js";
import RecipeService from "@/service/recipeService.js";

export default {
  data() {
    return {
      mealPlanList: [],
      recipes: [],
      allRecipes: [],
      userName: ""
    };
  },
  async created() {
    this.userName = JSON.parse(localStorage.getItem("user")).name;
    const recipes = await this.getMealPlanData();
    // console.log("RECIPES", recipes);
    // console.log("MEALPLANLIST", this.mealPlanList);
    this.recipes = recipes.filter(arr => arr.length > 0);
    this.allRecipes = await RecipeService.getRecipes(this.userName);
    // console.log("recipes", this.allRecipes);
  },
  methods: {
    async getMealPlanData() {
      return MealPlanService.getMealPlans(this.userName).then(
        (async mealPlanList => {
          this.$set(this, "mealPlanList", mealPlanList);
          const recipes = await Promise.all(
            mealPlanList.map(async mealPlan => {
              const ids = (mealPlan.recipeIdList || "").split(",");
              return await Promise.all(
                ids
                  .filter(el => el)
                  .map(async id => {
                    return await RecipeService.getOneRecipe(id).then(recipe => {
                      return {
                        id: mealPlan.id,
                        mealPlanName: mealPlan.mealPlanName,
                        recipeName: recipe.recipeName,
                        recipeId: recipe.id,
                        imageUrl: recipe.imageUrl
                      };
                    });
                  })
              );
            })
          );
          return recipes;
        }).bind(this)
      );
    },
    async addRecipeToMealPlan(event, mealPlanId) {
      const value = event.target.value;
      const mealPlan = this.mealPlanList.find(mp => mp.id === mealPlanId);
      const ids = [...(mealPlan.recipeIdList || "").split(","), value]
        .filter(el => el !== "")
        .join(",");
      MealPlanService.editMealPlan(mealPlanId, {
        ...mealPlan,
        recipeIdList: ids
      }).then(async () => {
        this.recipes = await this.getMealPlanData();
        // recipes: [[{ mealPLanId: 1, recipeId: 0}, { mealPLanId: 1, recipeId: 1}], ...]
      });
    },
    async getSingleRecipeData(id) {
      RecipeService.getOneRecipe(id);
    },
    async removeRecipeFromMealPlan(mealPlanId, recipeId, recipeIndex) {
      // console.log("recipe index", recipeIndex);
      const mealPlan = this.mealPlanList.find(mp => mp.id === mealPlanId);
      const ids = (mealPlan.recipeIdList || "")
        .split(",")
        .filter((id, i) => i !== recipeIndex);
      // if (ids.length > 0) {
      MealPlanService.editMealPlan(mealPlanId, {
        ...mealPlan,
        recipeIdList: ids.join(",")
      }).then(async () => {
        this.recipes = await this.getMealPlanData();
        // recipes: [[{ mealPLanId: 1, recipeId: 0}, { mealPLanId: 1, recipeId: 1}], ...]
      });
      // } else {
      //   alert("Please keep at least 1 item in a MealPlan!");
      // }
      // console.log(ids);
      // console.log(recipeId);
    },
    async addNewMealPlan() {
      MealPlanService.createMealPlan(this.userName, {
        mealPlanName: prompt("Meal Plan Name"),
        name: this.userName,
        date: "",
        recipeIdList: null
      }).then(async () => {
        this.recipes = await this.getMealPlanData();
        // recipes: [[{ mealPLanId: 1, recipeId: 0}, { mealPLanId: 1, recipeId: 1}], ...]
      });
    },
    async deleteMealPlan(mealPlanId) {
      MealPlanService.deleteMealPlan(this.userName, mealPlanId).then(
        async () => {
          this.recipes = await this.getMealPlanData();
          // recipes: [[{ mealPLanId: 1, recipeId: 0}, { mealPLanId: 1, recipeId: 1}], ...]
        }
      );
    }
  }
};
</script>


<style scoped>
button#delete {
  background-color: red;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: "Manjari", sans-serif;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
button#add:hover {
  background-color: white;
  color: black;
  border: 2px solid red;
}
button#add {
  background-color: #4caf50; /* Green */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: "Manjari", sans-serif;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
button#add:hover {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}
.recipes {
  max-width: 30%;
  display: inline-block;
  padding: 10px;
}

.mealPlanCard {
  width: 100%;
  clear: both;
  margin: 0 auto;
}
</style>