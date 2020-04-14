<template>
  <div class="recipePage">
    <h1 class="title">
      My Recipes
      <button class="addButton" v-on:click="addRecipe()">New Recipe</button>
    </h1>
    <div
      class="recipeCard"
      v-for="recipe in recipeList"
      :key="recipe.id"
      v-on:click="editRecipe(recipe)"
    >
      <img class="cardImage" :src="recipe.imageUrl" alt="Recipe Image" />
      <div class="container">
        <p>{{recipe.recipeName}}</p>
      </div>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal" v-if="modalEnabled">
      <div class="modal-content">
        <span class="close" v-on:click="closeModal()">&times;</span>

        <h1 v-if="newRecipe">Your New Recipe</h1>
        <h1 v-if="!newRecipe">Edit Recipe</h1>

        <form class="newRecipeForm">
          <div class="formOption">
            <label class="recipeName" for="recipeName">Recipe Name:</label>
            <input v-model="recipeName" type="text" name="recipeName" />
          </div>

          <div class="formOption">
            <label class="imageUrl" for="imageUrl">Image URL: &nbsp;</label>
            <input v-model="imageUrl" type="text" name="imageUrl" />
          </div>

          <div class="formOption">
            <label for="notes">Directions:</label>
            <br />
            <textarea class="instructions" v-model="notes" type="textarea" name="notes"></textarea>
          </div>

          <h3>Ingredients</h3>
          <div class="formOption">
            <label class="ingName" for="ingredientName">Ingredient Name:</label>
            <input v-model="ingredientName" type="text" name="ingredientName" />
          </div>

          <div class="formOption">
            <label class="measurement" for="measurement">Measurement:</label>
            <input v-model="measurement" type="text" name="measurement" />
          </div>

          <button class="ingredientButt" type="button" v-on:click="addIngredient()">Add Ingredient</button>

          <div class="listContent">
            <p
              class="ingredientEntry"
              v-for="(ingredient, index) in ingredientList"
              :key="ingredient.name"
            >
              {{ingredient.measurement}} | {{ingredient.name}}
              <button
                class="removeButt"
                v-on:click="removeIngredient(index)"
              >&times;</button>
            </p>
          </div>
        </form>
        <button v-if="newRecipe" type="submit" v-on:click="submitNewRecipe()">Submit</button>
        <button v-if="!newRecipe" type="submit" v-on:click="submitEditedRecipe()">Submit</button>
        <button v-if="!newRecipe" type="submit" v-on:click="deleteRecipe()">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeService from "@/service/recipeService.js";
import IngredientService from "@/service/ingredientsService.js";

export default {
  data() {
    return {
      recipeList: {},
      selectedRecipe: {},
      ingredientList: [],
      modalEnabled: false,
      newRecipe: true,
      recipeName: "",
      imageUrl: "",
      notes: "",
      measurement: "",
      ingredientName: "",
      selectedIngredient: {},
      userName: ""
    };
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem("user")).name;
    this.getRecipeData();
  },
  methods: {
    addRecipe() {
      this.modalEnabled = true;
      this.newRecipe = true;
    },

    submitNewRecipe() {
      let ingredientPayload = {
        ingredientList: JSON.stringify(this.ingredientList)
      };

      IngredientService.createIngredient(ingredientPayload).then(response => {
        let recipePayload = {
          recipeName: this.recipeName,
          imageUrl: this.imageUrl,
          notes: this.notes,
          ingredientId: response.id,
          name: this.userName
        };

        RecipeService.createRecipe(recipePayload).then(response => {
          this.recipeList.push(response);
        });

        this.closeModal();
      });
    },

    editRecipe(recipe) {
      console.log(recipe);
      this.modalEnabled = true;
      this.newRecipe = false;

      this.recipeName = recipe.recipeName;
      this.imageUrl = recipe.imageUrl;
      this.notes = recipe.notes;
      this.getOneIngredientData(recipe.ingredientId);
      this.selectedRecipe = recipe;

      this.$forceUpdate();
    },

    submitEditedRecipe() {
      let ingredientPayload = {
        ingredientList: JSON.stringify(this.ingredientList)
      };
      this.editIngredientData(
        this.selectedRecipe.ingredientId,
        ingredientPayload
      );

      let recipePayload = {
        recipeName: this.recipeName,
        imageUrl: this.imageUrl,
        notes: this.notes,
        ingredientId: this.selectedRecipe.ingredientId,
        name: this.userName
      };
      this.editRecipeData(this.selectedRecipe.id, recipePayload);

      this.closeModal();
    },

    deleteRecipe() {
      this.deleteIngredientData(this.selectedRecipe.ingredientId);
      this.deleteRecipeData(this.selectedRecipe.id);

      this.closeModal();
    },

    closeModal() {
      this.modalEnabled = false;
      this.ingredientList = [];
      this.recipeName = "";
      this.imageUrl = "";
      this.notes = "";
      this.measurement = "";
      this.ingredientName = "";
      this.selectedRecipe = {};
      this.selectedIngredient = {};
    },

    addIngredient() {
      let ojbTemp = {
        name: this.ingredientName,
        measurement: this.measurement
      };
      this.ingredientList.push(ojbTemp);
      this.measurement = "";
      this.ingredientName = "";
    },

    removeIngredient(index) {
      this.$delete(this.ingredientList, index);
    },

    async getRecipeData() {
      RecipeService.getRecipes(this.userName).then(
        (recipeList => {
          this.$set(this, "recipeList", recipeList);
        }).bind(this)
      );
    },

    async getSingleRecipeData(id) {
      RecipeService.getOneRecipe(id).then(selectedRecipe => {
        this.$set(this, "selectedRecipe", selectedRecipe);
      });
    },

    async editRecipeData(id, payload) {
      RecipeService.editRecipe(id, payload).then(response => {
        console.log(response);
        this.getRecipeData();
        // this.recipeList.$forceUpdate;
      });
    },

    async deleteRecipeData(id) {
      RecipeService.deleteRecipe(id).then(response => {
        console.log(response);
        this.getRecipeData();
      });
    },

    async getOneIngredientData(id) {
      IngredientService.getOneIngredient(id).then(
        (ingredientList => {
          this.$set(
            this,
            "ingredientList",
            JSON.parse(ingredientList.ingredientList)
          );
        }).bind(this)
      );
    },

    async editIngredientData(id, payload) {
      IngredientService.editIngredient(id, payload).then(response => {
        console.log(response);
      });
    },

    async deleteIngredientData(id) {
      IngredientService.deleteIngredient(id).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style scoped >
.addButton {
  float: right;
  font-size: 22px;
}

button {
  background-color: #008cba;
  color: white;
  font-size: 16px;
  font-family: "Manjari", sans-serif;
  padding: 4px 12px;
  border-radius: 8px;
}

.recipeCard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */

  display: inline-block;
  margin-left: 35px;
  margin-top: 35px;
}

/* On mouse-over, add a deeper shadow */
.recipeCard:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
  font-size: 20px;
  font-weight: bold;
}

/* Add rounded corners to the top left and the top right corner of the image */
.cardImage {
  border-radius: 5px 5px 0 0;
  width: 420px;
  height: 315px;
}

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 35%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.formOption {
  margin-top: 15px;
  text-align: left;
}

.formOption input {
  width: 60%;
}

.listContent {
  width: 85%;
  float: left;
  margin-top: 2%;
  margin-left: 15%;
  text-align: left;
}

.removeButt {
  float: right;
  margin-right: 5%;
}

.instructions {
  width: 75%;
  height: 125px;
  max-width: 100%;
}

.ingredientButt {
  margin-top: 15px;
}

.recipeName {
  margin-right: 17px;
}

.imageUrl {
  margin-right: 33px;
}

.measurement {
  margin-right: 20px;
}

.title {
  font-size: 60px;
}
</style>
