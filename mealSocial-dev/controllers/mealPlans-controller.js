exports.getMealPlans = function(req, res, next) {
    res.send("Get MealPlans!")
}

exports.getMealPlanById = function(req, res, next) {
    res.send("Get MealPlan by Id!")
}

exports.createMealPlan = function(req, res, next) {
    res.send("Create new MealPlan!")
}

exports.editMealPlan = function(req, res, next) {
    res.send("Edit MealPlan by Id!")
}

exports.deleteMealPlan = function(req, res, next) {
    res.send("Delete MealPlan By Id!")
}