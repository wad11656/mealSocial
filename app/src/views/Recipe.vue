<template>
  <div class="recipe">
    <RecipeList/>
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeList from '@/components/RecipeList.vue'

export default {
  name: 'Recipes',
  components: {
    RecipeList
  }
}
</script>
