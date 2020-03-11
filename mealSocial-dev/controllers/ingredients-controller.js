exports.getIngredients = function(req, res, next) {
    res.send("Get Ingredients !")
}

exports.createIngredient = function(req, res, next) {
    res.send("Create new Ingredient!")
}

exports.getIngredientList = function(req, res, next) {
    res.send("Get All Ingredients in a Recipe!")
}

exports.getIngredientById = function(req, res, next) {
    res.send("Get Ingredient by Id!")
}

exports.editIngredient = function(req, res, next) {
    res.send("Edit Ingredient by Id!")
}

exports.deleteIngredient = function(req, res, next) {
    res.send("Delete Ingredient By Id!")
}