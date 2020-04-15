<template>
  <div class="mealPlanPage">
    <h1 id="title">
      <img
        src="../assets/meal.png"
        width="200px"
        style="vertical-align:middle;"
      />My MealPlans
      <button id="add" type="submit" @click="addNewMealPlan">
        New MealPlan
      </button>
    </h1>
    <div
      v-for="(mealPlan, index) in mealPlanList"
      :key="mealPlan.id"
      class="mealPlanCard"
    >
      <div class="container">
        <div>
          <h2>
            <span style="text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.8);">
              {{ mealPlan.mealPlanName }}
            </span>
            <button
              id="delete"
              type="submit"
              @click="deleteMealPlan(mealPlan.id)"
            >
              Delete
            </button>
            <span style="float:right;margin-top:-15px;padding-right: 10%;">
              <font size="3px" color="#d21f3c">Pick a date:</font>
              <datepicker
                style="margin-top: -10px;"
                :placeholder="mealPlan.date"
                v-model="mealPlan.date"
                @selected="changeDate(mealPlan.id, mealPlan)"
                >Change Day</datepicker
              >
            </span>
          </h2>
          <select v-on:change="e => addRecipeToMealPlan(e, mealPlan.id)">
            <option disabled selected value>Select recipe to add</option>
            <option
              v-for="selectable in allRecipes"
              :value="selectable.id"
              :key="selectable.id"
              >{{ selectable.recipeName }}</option
            >
          </select>
        </div>
        <div
          class="recipes"
          v-for="(recipe, recipeIndex) in recipes[index]"
          :key="recipe.recipeName"
        >
          <img
            :src="recipe.imageUrl"
            width="200px"
            style="border-radius: 15px; -webkit-filter: drop-shadow(4px 2px 2px rgba(150, 150, 150, 1));"
          />
          <p>
            <img
              id="trash"
              src="../assets/trash_small2.png"
              width="11px"
              v-on:click="
                removeRecipeFromMealPlan(
                  mealPlan.id,
                  recipe.recipeId,
                  recipeIndex
                )
              "
            />
            {{ recipe.recipeName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
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
  components: {
    Datepicker
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
        mealPlanName: prompt("MealPlan Name"),
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
    },
    async changeDate(mealPlanId, mealPlanObject) {
      //console.log(mealPlanId);
      //console.log(mealPlanObject);
      //console.log(typeof mealPlanObject.date);
      MealPlanService.editMealPlan(mealPlanId, mealPlanObject).then(
        async () => {
          this.recipes = await this.getMealPlanData();
        }
      );
    }
  }
};
</script>

<style scoped>
.vdp-datepicker {
  font-size: 18px;
  color: #3792cb;
  border-radius: 5px;
  font-family: "Manjari", sans-serif;
  font-size: 20px;
  padding-top: 10px;
}
h2 {
  padding-top: 20px;
  margin-left: 22%;
  font-size: 35px;
  color: #ffbf00;
}
select {
  color: #3792cb;
  border: 1px solid #01579b;
  border-radius: 5px;
  font-family: "Manjari", sans-serif;
  font-size: 20px;
  padding-top: 10px;
  margin-bottom: 20px;
}
option:nth-child(even) {
  color: goldenrod;
}
.mealPlanPage {
  width: 90%;
  text-align: center;
  margin: auto;
}
#trash {
  cursor: pointer;
}
button#delete {
  background-color: red;
  border: none;
  border-radius: 5px;
  border: 2px solid red;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: "Manjari", sans-serif;
  font-size: 12px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding-top: 6px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 1px;
}
button#delete:hover {
  background-color: white;
  padding: -1px;
  color: black;
  border: 2px solid red;
}
button#add {
  background-color: #daa520; /* Green */
  border: 2px outset silver;
  border-radius: 5px;
  color: white;
  padding: 18px 16px 14px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: "Manjari", sans-serif;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  float: right;
  font-size: 22px;
}
button#add:hover {
  background-color: white;
  color: black;
  border: 2px solid #daa520;
}
.recipes {
  max-width: 30%;
  display: inline-block;
  padding: 10px;
}

.mealPlanCard {
  width: 100%;
  clear: both;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), inset 1px 0 3px #0ff,
    inset -3px 0 3px #0ff;
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  display: block;
}

#title {
  font-size: 60px;
  color: #ffd700;
  text-shadow: 2px 1px 2px rgba(150, 150, 150, 0.79);
}
</style>
