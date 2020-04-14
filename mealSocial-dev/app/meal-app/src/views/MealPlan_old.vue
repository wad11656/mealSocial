<template>
  <h1>MealPlans</h1>
</template>

<script>
import MealPlanService from "@/service/mealPlanService.js";
import RecipeService from "@/service/recipeService.js";

export default {
  data() {
    return {
      mealPranList: {},
      selectedMealPlan: {},
      recipeIdList: [],
      modalEnabled: false,
      newMealPlan: true,
      name: "",
      imageUrl: "",
      date: ""
    };
  },
  created() {
    this.getMealPlanData();
  },
  methods: {
    /*                       */
    /* CREATE NEW (FRONTEND) */
    /*                       */
    addMealPlan() {
      this.modalEnabled = true;
      this.newMealPlan = true;
    },
    /*                       */
    /* SUBMIT NEW (FRONTEND) */
    /*                       */
    submitNewMealplan() {
      let mealPlanPayload = {
        name: this.name,
        recipeIdList: JSON.stringify(this.recipeIdList),
        date: this.date
      };
      MealPlanService.createMealPlan(mealPlanPayload).then(response => {
        this.mealPlanList.push(response);
      });
      this.closeModal();
    },
    /*                 */
    /* EDIT (FRONTEND) */
    /*                 */
    editMealPlan(mealPlan) {
      console.log(mealPlan);
      this.modalEnabled = true;
      this.newMealPlan = false;

      this.name = mealPlan.name;
      this.recipeIdList = mealPlan.recipeIdList;
      this.date = mealPlan.date;
      this.getRecipeListData(mealPlan.recipeIdList);
      this.selectedMealPlan = mealPlan;

      this.$forceUpdate();
    },
    /*                        */
    /* SUBMIT EDIT (FRONTEND) */
    /*                        */
    submitEditedMealPlan() {
      let mealPlanPayload = {
        name: this.name,
        recipeIdList: JSON.stringify(this.recipeIdList),
        date: this.date
      };
      this.editMealPlanData(this.selectedMealPlan.id, mealPlanPayload);

      this.closeModal();
    },
    /*                            */
    /* DELETE MEALPLAN (FRONTEND) */
    /*                            */
    deleteMealPlan() {
      this.deleteMealPlanData(this.selectedMealPlan.id);

      this.closeModal();
    },
    removeIngredient(index) {
      this.$delete(this.ingredientList, index);
    },
    /*                        */
    /* CLOSE MODAL (FRONTEND) */
    /*                        */
    closeModal() {
      this.modalEnabled = false;
      this.recipeIdList = [];
      this.name = "";
      this.imageUrl = "";
      this.date = "";
      this.selectedMealPlan = {};
    },
    /* ====================================== */
    /* ====================================== */
    /* ====================================== */
    /*                             */
    /* GET ALL MEALPLANS (BACKEND) */
    /*                             */
    async getMealPlanData() {
      MealPlanService.getMealPlans().then(
        (recipeList => {
          this.$set(this, "recipeList", recipeList);
        }).bind(this)
      );
    },
    /*                               */
    /* GET SINGLE MEALPLAN (BACKEND) */
    /*                               */
    async getSingleMealPlanData(id) {
      MealPlanService.getOneMealPlan(id).then(selectedMealPlan => {
        this.$set(this, "selectedMealPlan", selectedMealPlan);
      });
    },
    /*                         */
    /* EDIT MEALPLAN (BACKEND) */
    /*                         */
    async editMealPlanData(id, payload) {
      MealPlanService.editMealPlan(id, payload).then(response => {
        console.log(response);
        this.getMealPlanData();
        // this.recipeList.$forceUpdate;
      });
    },
    /*                           */
    /* DELETE MEALPLAN (BACKEND) */
    /*                           */
    async deleteMealPlanData(id) {
      MealPlanService.deleteMealPlan(id).then(response => {
        console.log(response);
        this.getMealPlanData();
      });
    },
    /*                           */
    /* GET ALL RECIPES (BACKEND) */
    /*                           */
    async getRecipeData() {
      RecipeService.getRecipes().then(
        (recipeList => {
          this.$set(this, "recipeList", recipeList);
        }).bind(this)
      );
    },
    /*                             */
    /* GET SINGLE RECIPE (BACKEND) */
    /*                             */
    async getSingleRecipeData(id) {
      RecipeService.getOneRecipe(id).then(selectedRecipe => {
        this.$set(this, "selectedRecipe", selectedRecipe);
      });
    },
    /*                       */
    /* EDIT RECIPE (BACKEND) */
    /*                       */
    async editRecipeData(id, payload) {
      RecipeService.editRecipe(id, payload).then(response => {
        console.log(response);
        this.getRecipeData();
        // this.recipeList.$forceUpdate;
      });
    },
    /*                         */
    /* DELETE RECIPE (BACKEND) */
    /*                         */
    async deleteRecipeData(id) {
      RecipeService.deleteRecipe(id).then(response => {
        console.log(response);
        this.getRecipeData();
      });
    }
  } // end of methods {}
}; // end of export default {}
</script>

<style scoped >
</style>
