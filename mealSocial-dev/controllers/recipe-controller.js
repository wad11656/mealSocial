exports.getRecipes = function(req, res, next) {
    res.send("Get Recipes!")
}

exports.getRecipeById = function(req, res, next) {
    res.send("Get Recipe by Id!")
}

exports.createRecipe = function(req, res, next) {
    res.send("Create new Recipe!")
}

exports.editRecipe = function(req, res, next) {
    res.send("Edit Recipe by Id!")
}

exports.deleteRecipe = function(req, res, next) {
    res.send("Delete Recipe By Id!")
}